import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Meta (WhatsApp/Facebook) webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // Verify webhook signature from Meta
    if (!verifyMetaWebhookSignature(body, signature)) {
      console.error('Invalid Meta webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const webhookData = JSON.parse(body);
    console.log('Meta webhook received:', webhookData);

    // Handle WhatsApp Business API events
    if (webhookData.object === 'whatsapp_business_account') {
      for (const entry of webhookData.entry) {
        for (const change of entry.changes) {
          if (change.field === 'messages') {
            await handleWhatsAppMessages(change.value);
          } else if (change.field === 'message_template_status_update') {
            await handleTemplateStatusUpdate(change.value);
          } else if (change.field === 'account_update') {
            await handleAccountUpdate(change.value);
          }
        }
      }
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('Meta webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Verify Meta webhook signature
function verifyMetaWebhookSignature(body: string, signature: string | null): boolean {
  if (!signature) {
    return false;
  }

  const appSecret = process.env.META_APP_SECRET || process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    console.error('META_APP_SECRET not configured');
    return false;
  }

  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', appSecret)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

async function handleWhatsAppMessages(messageData: any) {
  const { messages, contacts, metadata } = messageData;

  if (!messages) return;

  for (const message of messages) {
    try {
      const phoneNumber = message.from;
      const messageType = message.type;
      const timestamp = new Date(parseInt(message.timestamp) * 1000);

      // Extract message content based on type
      let content = '';
      let messageMetadata: any = { type: messageType };

      switch (messageType) {
        case 'text':
          content = message.text?.body || '';
          break;
        case 'image':
          content = message.image?.caption || 'Image received';
          messageMetadata.imageId = message.image?.id;
          messageMetadata.mimeType = message.image?.mime_type;
          break;
        case 'document':
          content = message.document?.caption || 'Document received';
          messageMetadata.documentId = message.document?.id;
          messageMetadata.filename = message.document?.filename;
          break;
        case 'location':
          content = `Location: ${message.location?.latitude}, ${message.location?.longitude}`;
          messageMetadata.location = message.location;
          break;
        case 'button':
          content = message.button?.text || 'Button pressed';
          messageMetadata.buttonId = message.button?.payload;
          break;
        case 'interactive':
          if (message.interactive?.type === 'button_reply') {
            content = message.interactive.button_reply.title;
            messageMetadata.buttonId = message.interactive.button_reply.id;
          } else if (message.interactive?.type === 'list_reply') {
            content = message.interactive.list_reply.title;
            messageMetadata.listId = message.interactive.list_reply.id;
          }
          break;
        default:
          content = `${messageType} message received`;
      }

      // Store message in database
      await prisma.whatsAppMessage.create({
        data: {
          phoneNumber,
          messageType: 'RECEIVED',
          content,
          metadata: JSON.stringify({
            ...messageMetadata,
            messageId: message.id,
            timestamp: message.timestamp,
            wamid: message.id
          })
        }
      });

      // Update user interaction
      await prisma.whatsAppUser.upsert({
        where: { phoneNumber },
        update: { lastInteraction: timestamp },
        create: {
          phoneNumber,
          state: 'NEW',
          lastInteraction: timestamp
        }
      });

      // Log analytics event
      await prisma.analytics.create({
        data: {
          phoneNumber,
          event: `MESSAGE_RECEIVED_${messageType.toUpperCase()}`,
          funnelStage: 'ENGAGEMENT',
          metadata: JSON.stringify({
            messageType,
            messageId: message.id,
            hasText: !!content
          })
        }
      });

      console.log(`Stored ${messageType} message from ${phoneNumber}:`, content.substring(0, 100));

    } catch (error) {
      console.error('Error handling WhatsApp message:', error);
    }
  }
}

async function handleTemplateStatusUpdate(templateData: any) {
  const { message_template_id, message_template_name, message_template_language, event, reason } = templateData;

  console.log('Template status update:', {
    id: message_template_id,
    name: message_template_name,
    language: message_template_language,
    event,
    reason
  });

  // Log template status changes
  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: `TEMPLATE_${event.toUpperCase()}`,
      funnelStage: 'SYSTEM',
      metadata: JSON.stringify({
        templateId: message_template_id,
        templateName: message_template_name,
        language: message_template_language,
        event,
        reason
      })
    }
  });
}

async function handleAccountUpdate(accountData: any) {
  console.log('WhatsApp Business Account update:', accountData);

  // Log account updates
  await prisma.analytics.create({
    data: {
      phoneNumber: 'SYSTEM',
      event: 'ACCOUNT_UPDATE',
      funnelStage: 'SYSTEM',
      metadata: JSON.stringify(accountData)
    }
  });
}

// GET endpoint for webhook verification (Meta requirement)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify the webhook with Meta
  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('Meta webhook verified successfully');
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.error('Meta webhook verification failed');
    return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
  }
}