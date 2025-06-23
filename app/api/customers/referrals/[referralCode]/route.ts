import { NextRequest, NextResponse } from 'next/server';
import { customerService } from '@/lib/services/customerService';

export async function GET(
  request: NextRequest,
  { params }: { params: { referralCode: string } }
) {
  try {
    const { referralCode } = params;

    if (!referralCode) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      );
    }

    // Get the customer who owns this referral code
    const referrer = await customerService.getByReferralCode(referralCode);
    
    if (!referrer) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      );
    }

    // Get customers referred by this referral code
    const referredCustomers = await customerService.getReferredCustomers(referralCode);

    return NextResponse.json({
      success: true,
      data: {
        referrer: {
          id: referrer.id,
          name: referrer.name,
          phoneNumber: referrer.phoneNumber
        },
        referredCustomers: referredCustomers.map(customer => ({
          id: customer.id,
          name: customer.name,
          phoneNumber: customer.phoneNumber,
          createdAt: customer.createdAt,
          leadScore: customer.leadScore
        })),
        totalReferred: referredCustomers.length
      }
    });

  } catch (error) {
    console.error('Get referrals error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}