import { NextResponse } from 'next/server';
import { CashfreeService } from '@/lib/cashfree';

const cashfreeService = new CashfreeService({
  clientId: process.env.CASHFREE_CLIENT_ID!,
  clientSecret: process.env.CASHFREE_CLIENT_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'PROD' : 'TEST'
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planType, subscriptionTier, customerDetails, landingPageData } = body;

    const plans = cashfreeService.generateDarjberryPlans();
    const selectedPlan = plans[planType as keyof typeof plans];

    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    const subscriptionId = `DARJ_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const subscriptionRequest = {
      subscriptionId,
      planId: selectedPlan.planId,
      customerDetails: {
        customerId: `CUST_${customerDetails.phone}`,
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
      },
      subscriptionNote: `Darjberry investment - ${selectedPlan.planName}`,
      subscriptionMeta: {
        landingPageSource: landingPageData?.source || 'direct',
        location: landingPageData?.location || 'unknown',
        investmentAmount: selectedPlan.amount,
        subscriptionTier: subscriptionTier || '1year',
        expectedPlots: Math.floor(selectedPlan.amount / 50000),
        coreOffer: 'Grow berries on your land or in the Himalayas, earn passive tax-free income'
      },
      returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      subscriptionTags: {
        product: 'blueberry_farming',
        location: landingPageData?.location || 'unknown',
        amount: selectedPlan.amount.toString()
      }
    };

    const subscription = await cashfreeService.createSubscription(subscriptionRequest);

    return NextResponse.json({
      success: true,
      subscription,
      planDetails: selectedPlan,
      message: 'Subscription created successfully'
    });

  } catch (error) {
    console.error('Cashfree subscription creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    const subscription = await cashfreeService.getSubscription(subscriptionId);

    return NextResponse.json({
      success: true,
      subscription
    });

  } catch (error) {
    console.error('Cashfree subscription fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { subscriptionId, updateData } = body;

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    const updatedSubscription = await cashfreeService.updateSubscription(subscriptionId, updateData);

    return NextResponse.json({
      success: true,
      subscription: updatedSubscription,
      message: 'Subscription updated successfully'
    });

  } catch (error) {
    console.error('Cashfree subscription update error:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subscriptionId = searchParams.get('subscriptionId');

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID required' }, { status: 400 });
    }

    const cancelledSubscription = await cashfreeService.cancelSubscription(subscriptionId);

    return NextResponse.json({
      success: true,
      subscription: cancelledSubscription,
      message: 'Subscription cancelled successfully'
    });

  } catch (error) {
    console.error('Cashfree subscription cancellation error:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}