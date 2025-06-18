import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get all users with their latest interaction
    const users = await prisma.whatsAppUser.findMany({
      orderBy: { lastInteraction: 'desc' },
      take: 100, // Limit to last 100 users
    });

    // Get analytics data
    const totalUsers = await prisma.whatsAppUser.count();
    const locationShared = await prisma.whatsAppUser.count({
      where: { location: { not: null } },
    });
    const proposalsGenerated = await prisma.investment.count();
    
    const conversationRate = totalUsers > 0 ? (proposalsGenerated / totalUsers) * 100 : 0;

    // Calculate average response time (simplified)
    const averageResponse = 5; // Placeholder - would calculate from message timestamps

    // Get all investments
    const investments = await prisma.investment.findMany({
      orderBy: { proposalSentAt: 'desc' },
      take: 50,
    });

    // Get recent messages
    const messages = await prisma.whatsAppMessage.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100,
    });

    // Calculate lead scores based on user engagement
    const usersWithScores = users.map(user => ({
      ...user,
      leadScore: calculateLeadScore(user),
    }));

    const dashboardData = {
      users: usersWithScores,
      analytics: {
        totalUsers,
        conversationRate,
        locationShared,
        proposalsGenerated,
        averageResponse,
      },
      investments,
      messages,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(user: {
  location?: string | null;
  landSize?: number | null;
  lastInteraction: string | Date;
  state: string;
}): number {
  let score = 0;
  
  // Base score for engagement
  score += 20;
  
  // Location shared
  if (user.location) score += 30;
  
  // Land size provided
  if (user.landSize) score += 25;
  
  // Recent interaction (within 7 days)
  const daysSinceInteraction = Math.floor(
    (Date.now() - new Date(user.lastInteraction).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceInteraction <= 1) score += 20;
  else if (daysSinceInteraction <= 3) score += 15;
  else if (daysSinceInteraction <= 7) score += 10;
  
  // State-based scoring
  const stateScores: { [key: string]: number } = {
    'NEW': 5,
    'SELECTING_SERVICE': 10,
    'LAND_DETAILS': 15,
    'LOCATION_SHARED': 20,
    'PROPOSAL_REQUESTED': 25,
    'FOLLOW_UP': 15,
  };
  
  score += stateScores[user.state] || 0;
  
  return Math.min(100, score);
}