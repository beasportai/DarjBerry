import { NextRequest, NextResponse } from 'next/server';
import { customerService } from '@/lib/services/customerService';
import { authenticateRequest } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Authentication required
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get('phone');
    const referralCode = searchParams.get('referralCode');

    if (!phoneNumber && !referralCode) {
      return NextResponse.json(
        { error: 'Phone number or referral code is required' },
        { status: 400 }
      );
    }

    let customer = null;

    if (phoneNumber) {
      customer = await customerService.getByPhoneNumber(phoneNumber);
    } else if (referralCode) {
      customer = await customerService.getByReferralCode(referralCode);
    }

    if (!customer) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: customer
    });

  } catch (error) {
    console.error('Search customer error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}