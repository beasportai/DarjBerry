import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { authenticateRequest } from '@/lib/middleware/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get full user profile with related data
    const profile = await prisma.whatsAppUser.findUnique({
      where: { id: user.id },
      include: {
        landAnalysis: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        investments: {
          orderBy: { proposalSentAt: 'desc' },
          take: 5
        },
        sipInvestments: {
          where: { status: 'ACTIVE' },
          orderBy: { startDate: 'desc' }
        },
        berryPlots: {
          orderBy: { acquisitionDate: 'desc' }
        },
        memberBenefits: true
      }
    });

    if (!profile) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: profile
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { name, email, location, landSize, landType } = await request.json();

    const updatedUser = await prisma.whatsAppUser.update({
      where: { id: user.id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(location && { location }),
        ...(landSize && { landSize: parseFloat(landSize) }),
        ...(landType && { landType }),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        phoneNumber: updatedUser.phoneNumber,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        landSize: updatedUser.landSize,
        landType: updatedUser.landType,
        state: updatedUser.state
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}