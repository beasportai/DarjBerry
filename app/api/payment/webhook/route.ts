import { NextRequest, NextResponse } from 'next/server';
import { CashfreeProvider } from '@/lib/cashfree-provider';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Payment webhook received:', body);
    
    // Verify webhook signature and process payment events
    const cashfreeProvider = new CashfreeProvider();
    await cashfreeProvider.handleWebhook(body);
    
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Payment webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Payment webhook endpoint' });
}