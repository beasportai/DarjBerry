import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export interface AuthUser {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  state: string;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as any;
    
    if (!decoded.userId || !decoded.phoneNumber) {
      return null;
    }

    // Check if session exists and is valid
    const session = await prisma.authSession.findUnique({
      where: { token }
    });

    if (!session || new Date() > session.expiresAt) {
      // Clean up expired session
      if (session) {
        await prisma.authSession.delete({
          where: { id: session.id }
        });
      }
      return null;
    }

    // Get user details
    const user = await prisma.whatsAppUser.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      phoneNumber: user.phoneNumber,
      name: user.name || undefined,
      email: user.email || undefined,
      state: user.state
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function requireAuth() {
  return async (request: NextRequest) => {
    const user = await authenticateRequest(request);
    
    if (!user) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return user;
  };
}

// Helper to validate phone numbers in requests
export function validatePhoneNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/^\+91/, '').replace(/^91/, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

// Rate limiting helper
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMinutes: number = 15
): Promise<boolean> {
  // This would typically use Redis in production
  // For now, using in-memory rate limiting with Prisma
  
  const windowStart = new Date(Date.now() - windowMinutes * 60 * 1000);
  
  // Count requests in the current window
  const requestCount = await prisma.rateLimitRecord.count({
    where: {
      phoneNumber: identifier,
      createdAt: {
        gte: windowStart
      }
    }
  });

  return requestCount < maxRequests;
}