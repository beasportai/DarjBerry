import { NextRequest, NextResponse } from 'next/server';
import { whatsappAuthService, validateWhatsAppPhoneNumber, normalizeWhatsAppPhoneNumber } from '@/lib/services/whatsappAuth';

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
    if (!validateWhatsAppPhoneNumber(rawPhoneNumber)) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please provide a valid Indian mobile number.' },
        { status: 400 }
      );
    }

    const phoneNumber = normalizeWhatsAppPhoneNumber(rawPhoneNumber);

    // Generate WhatsApp authentication flow
    const authFlow = await whatsappAuthService.generateAuthFlow(phoneNumber);

    return NextResponse.json({
      success: true,
      message: 'WhatsApp authentication initiated',
      whatsappUrl: authFlow.whatsappUrl,
      expiresAt: authFlow.expiresAt,
      instructions: [
        'Click the WhatsApp link below',
        'Send the pre-filled message to our business number', 
        'We will respond with a secure login link',
        'Click the login link to complete authentication'
      ]
    });

  } catch (error) {
    console.error('WhatsApp auth initiation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}