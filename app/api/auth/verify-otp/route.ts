import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { otpService, rateLimiter, validatePhoneNumber, normalizePhoneNumber } from '@/lib/services/otpService';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber: rawPhoneNumber, otp } = await request.json();

    if (!rawPhoneNumber || !otp) {
      return NextResponse.json(
        { error: 'Phone number and OTP are required' },
        { status: 400 }
      );
    }

    // Validate and normalize phone number
    const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
    
    if (!validatePhoneNumber(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate OTP format
    if (!/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { error: 'Invalid OTP format' },
        { status: 400 }
      );
    }

    // Check if OTP verification attempts exceeded
    const attempts = await otpService.getAttemptsCount(phoneNumber);
    if (attempts >= 5) {
      return NextResponse.json(
        { error: 'Too many verification attempts. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // Verify OTP
    const isValid = await otpService.verify(phoneNumber, otp);
    
    if (!isValid) {
      // Increment attempts for failed verification
      await otpService.incrementAttempts(phoneNumber);
      
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }

    // OTP verified successfully - find or create user
    let user = await prisma.whatsAppUser.findUnique({
      where: { phoneNumber }
    });

    if (!user) {
      // Create new user
      user = await prisma.whatsAppUser.create({
        data: {
          phoneNumber,
          state: 'NEW'
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        phoneNumber: user.phoneNumber 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    // Create auth session
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await prisma.authSession.create({
      data: {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        token,
        expiresAt
      }
    });

    // Reset rate limiting and attempts
    await rateLimiter.resetCounter(phoneNumber);
    await otpService.resetAttempts(phoneNumber);

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        email: user.email,
        state: user.state
      },
      token
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}