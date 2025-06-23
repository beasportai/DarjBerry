import { NextRequest, NextResponse } from 'next/server';
import { otpService, rateLimiter, validatePhoneNumber, normalizePhoneNumber, sendOTP } from '@/lib/services/otpService';

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber: rawPhoneNumber } = await request.json();

    if (!rawPhoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Validate and normalize phone number
    const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
    
    if (!validatePhoneNumber(phoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please provide a valid Indian mobile number.' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const canSendOTP = await rateLimiter.checkLimit(phoneNumber);
    if (!canSendOTP) {
      return NextResponse.json(
        { error: 'Too many OTP requests. Please try again after 15 minutes.' },
        { status: 429 }
      );
    }

    // Generate and store OTP
    const otp = await otpService.create(phoneNumber);
    
    // Send OTP via SMS
    const sent = await sendOTP(phoneNumber, otp);
    
    if (!sent) {
      return NextResponse.json(
        { error: 'Failed to send OTP. Please try again.' },
        { status: 500 }
      );
    }

    // Increment rate limiting counter
    await rateLimiter.incrementCounter(phoneNumber);

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      expiresInMinutes: 10
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}