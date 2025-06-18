import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Cashfree webhook handler for payment updates
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-webhook-signature');
    const timestamp = request.headers.get('x-webhook-timestamp');

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature, timestamp)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const webhookData = JSON.parse(body);
    console.log('Cashfree webhook received:', webhookData);

    // Handle different webhook events
    switch (webhookData.type) {
      case 'PAYMENT_SUCCESS':
        await handlePaymentSuccess(webhookData.data);
        break;
      
      case 'PAYMENT_FAILED':
        await handlePaymentFailure(webhookData.data);
        break;
      
      case 'SUBSCRIPTION_ACTIVATED':
        await handleSubscriptionActivated(webhookData.data);
        break;
      
      case 'SUBSCRIPTION_CANCELLED':
        await handleSubscriptionCancelled(webhookData.data);
        break;
      
      case 'SUBSCRIPTION_PAUSED':
        await handleSubscriptionPaused(webhookData.data);
        break;
      
      case 'SUBSCRIPTION_RESUMED':
        await handleSubscriptionResumed(webhookData.data);
        break;
      
      case 'PAYMENT_RETRY':
        await handlePaymentRetry(webhookData.data);
        break;
      
      default:
        console.log('Unhandled webhook type:', webhookData.type);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Cashfree webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Verify webhook signature for security
function verifyWebhookSignature(
  body: string, 
  signature: string | null, 
  timestamp: string | null
): boolean {
  if (!signature || !timestamp) {
    return false;
  }

  const webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('CASHFREE_WEBHOOK_SECRET not configured');
    return false;
  }

  // Cashfree signature format: timestamp.body
  const payload = `${timestamp}.${body}`;
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(payload)
    .digest('hex');

  // Compare signatures securely
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function handlePaymentSuccess(paymentData: any) {
  const { 
    order_id, 
    payment_id, 
    order_amount, 
    payment_method, 
    payment_time,
    subscription_id 
  } = paymentData;

  console.log('Payment successful:', { order_id, payment_id, order_amount });

  try {
    // Update SIP investment with payment details
    if (subscription_id) {
      const sipInvestment = await prisma.sIPInvestment.findFirst({
        where: { subscriptionId: subscription_id }
      });

      if (sipInvestment) {
        // Update total invested amount
        await prisma.sIPInvestment.update({
          where: { id: sipInvestment.id },
          data: {
            totalInvested: {
              increment: parseFloat(order_amount)
            },
            nextPaymentDate: new Date(Date.now() + 24 * 60 * 60 * 1000) // Next day
          }
        });

        // Calculate plants to allocate (₹50,000 per plot = 100 plants)
        const plantsToAllocate = Math.floor(parseFloat(order_amount) / 500); // ₹500 per plant
        
        if (plantsToAllocate > 0) {
          // Create berry plot allocation
          await prisma.berryPlot.create({
            data: {
              phoneNumber: sipInvestment.phoneNumber,
              plotNumber: `PLOT_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              location: 'Your Own Land',
              plantCount: plantsToAllocate,
              plotSize: plantsToAllocate / 2500, // 2500 plants per acre
              acquisitionDate: new Date(payment_time)
            }
          });

          // Send WhatsApp notification
          await sendWhatsAppNotification(
            sipInvestment.phoneNumber,
            `🎉 Payment successful! ₹${order_amount} processed.
            
🌱 ${plantsToAllocate} new plants allocated to your portfolio!
📍 Plot: ${`PLOT_${Date.now()}`}
💰 Total invested: ₹${(sipInvestment.totalInvested + parseFloat(order_amount)).toLocaleString()}

Your berry empire is growing! 🫐

Reply STATS to see your dashboard.`
          );
        }
      }
    }

    // Log payment record
    await logPaymentEvent({
      type: 'PAYMENT_SUCCESS',
      orderId: order_id,
      paymentId: payment_id,
      amount: parseFloat(order_amount),
      paymentMethod: payment_method,
      subscriptionId: subscription_id,
      timestamp: new Date(payment_time)
    });

  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailure(paymentData: any) {
  const { 
    order_id, 
    order_amount, 
    payment_method, 
    subscription_id,
    failure_reason 
  } = paymentData;

  console.log('Payment failed:', { order_id, failure_reason });

  try {
    if (subscription_id) {
      const sipInvestment = await prisma.sIPInvestment.findFirst({
        where: { subscriptionId: subscription_id }
      });

      if (sipInvestment) {
        // Send WhatsApp notification about payment failure
        await sendWhatsAppNotification(
          sipInvestment.phoneNumber,
          `⚠️ Payment issue with your daily SIP

💳 Amount: ₹${order_amount}
❌ Reason: ${failure_reason || 'Payment declined'}

Don't worry! We'll retry tomorrow. 

To update payment method:
🔄 Reply RETRY
💬 Reply HELP for assistance

Your berry journey continues! 🫐`
        );
      }
    }

    // Log payment failure
    await logPaymentEvent({
      type: 'PAYMENT_FAILED',
      orderId: order_id,
      amount: parseFloat(order_amount),
      paymentMethod: payment_method,
      subscriptionId: subscription_id,
      failureReason: failure_reason,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handleSubscriptionActivated(subscriptionData: any) {
  const { subscription_id, customer_details } = subscriptionData;

  console.log('Subscription activated:', subscription_id);

  try {
    await prisma.sIPInvestment.updateMany({
      where: { subscriptionId: subscription_id },
      data: { status: 'ACTIVE' }
    });

    // Send welcome message
    const phoneNumber = customer_details?.customer_phone;
    if (phoneNumber) {
      await sendWhatsAppNotification(
        phoneNumber,
        `🎉 Welcome to Darjberry!

Your daily SIP subscription is now ACTIVE! 

✅ Daily investment: ₹10,000
🌱 Plants allocation starts tomorrow
📊 Track progress anytime with STATS
🎁 Welcome berry box shipping soon

You're officially a berry farmer! 🫐

Reply HELP if you need anything.`
      );
    }

  } catch (error) {
    console.error('Error handling subscription activation:', error);
  }
}

async function handleSubscriptionCancelled(subscriptionData: any) {
  const { subscription_id, customer_details } = subscriptionData;

  console.log('Subscription cancelled:', subscription_id);

  try {
    await prisma.sIPInvestment.updateMany({
      where: { subscriptionId: subscription_id },
      data: { status: 'CANCELLED' }
    });

    const phoneNumber = customer_details?.customer_phone;
    if (phoneNumber) {
      await sendWhatsAppNotification(
        phoneNumber,
        `😢 Your Darjberry SIP has been cancelled.

Your existing plants continue growing and will generate returns from Year 3.

Want to restart anytime?
🔄 Reply RESTART
💬 Reply HELP to talk to our team

We'll miss you in the berry fields! 🫐`
      );
    }

  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

async function handleSubscriptionPaused(subscriptionData: any) {
  const { subscription_id } = subscriptionData;

  await prisma.sIPInvestment.updateMany({
    where: { subscriptionId: subscription_id },
    data: { status: 'PAUSED' }
  });
}

async function handleSubscriptionResumed(subscriptionData: any) {
  const { subscription_id } = subscriptionData;

  await prisma.sIPInvestment.updateMany({
    where: { subscriptionId: subscription_id },
    data: { status: 'ACTIVE' }
  });
}

async function handlePaymentRetry(paymentData: any) {
  const { subscription_id, retry_count } = paymentData;

  console.log(`Payment retry ${retry_count} for subscription:`, subscription_id);

  if (retry_count >= 3) {
    // After 3 retries, pause subscription and notify user
    await prisma.sIPInvestment.updateMany({
      where: { subscriptionId: subscription_id },
      data: { status: 'PAUSED' }
    });
  }
}

async function sendWhatsAppNotification(phoneNumber: string, message: string) {
  try {
    // Import WhatsApp service dynamically to avoid circular dependencies
    const { WhatsAppService } = await import('@/lib/whatsapp');
    await WhatsAppService.sendMessage(phoneNumber, message);

    // Log the message
    await prisma.whatsAppMessage.create({
      data: {
        phoneNumber,
        messageType: 'SENT',
        content: message,
        metadata: JSON.stringify({ source: 'webhook_notification' })
      }
    });

  } catch (error) {
    console.error('WhatsApp notification error:', error);
  }
}

async function logPaymentEvent(eventData: {
  type: string;
  orderId: string;
  paymentId?: string;
  amount: number;
  paymentMethod?: string;
  subscriptionId?: string;
  failureReason?: string;
  timestamp: Date;
}) {
  try {
    // Log to analytics table
    await prisma.analytics.create({
      data: {
        phoneNumber: eventData.subscriptionId || 'UNKNOWN',
        event: eventData.type,
        funnelStage: 'PAYMENT',
        metadata: JSON.stringify(eventData),
        timestamp: eventData.timestamp
      }
    });
  } catch (error) {
    console.error('Error logging payment event:', error);
  }
}

// GET endpoint for webhook verification
export async function GET() {
  return NextResponse.json({ 
    message: 'Cashfree webhook endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}