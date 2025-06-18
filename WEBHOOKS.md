# 🎣 Darjberry Webhook Configuration Guide

This document outlines all the webhooks required for the Darjberry production system to function properly.

## 📋 Required Webhooks

### 1. 💳 **Cashfree Payment Webhook** (CRITICAL)
- **Endpoint**: `/api/cashfree/webhook`
- **Purpose**: Handle payment events, subscription updates, failures
- **Required for**: SIP payments, subscription management, plant allocation

#### Events Handled:
- `PAYMENT_SUCCESS` - Process successful payments, allocate plants
- `PAYMENT_FAILED` - Handle payment failures, notify users
- `SUBSCRIPTION_ACTIVATED` - Activate user SIP subscriptions
- `SUBSCRIPTION_CANCELLED` - Handle subscription cancellations
- `SUBSCRIPTION_PAUSED` - Pause inactive subscriptions
- `SUBSCRIPTION_RESUMED` - Resume paused subscriptions
- `PAYMENT_RETRY` - Handle payment retry attempts

#### Configuration:
```env
CASHFREE_WEBHOOK_URL=https://yourdomain.com/api/cashfree/webhook
CASHFREE_WEBHOOK_SECRET=your_cashfree_webhook_secret
```

### 2. 💬 **WhatsApp Business API Webhook** (CRITICAL)
- **Endpoint**: `/api/whatsapp/webhook` (existing)
- **Purpose**: Handle incoming WhatsApp messages and bot interactions
- **Required for**: Customer communication, onboarding, support

#### Events Handled:
- Message reception (text, images, location, buttons)
- User state management and conversation flow
- Payment link generation and support

### 3. 📱 **Meta Platform Webhook** (HIGH PRIORITY)
- **Endpoint**: `/api/webhooks/meta`
- **Purpose**: Handle Meta platform events (WhatsApp, Instagram)
- **Required for**: Advanced WhatsApp features, template status updates

#### Events Handled:
- WhatsApp message status updates
- Template approval/rejection notifications
- Account status changes
- Message delivery confirmations

#### Configuration:
```env
META_APP_SECRET=your_meta_app_secret
WHATSAPP_VERIFY_TOKEN=your_verification_token
```

### 4. 🔧 **System Monitoring Webhook** (MEDIUM PRIORITY)
- **Endpoint**: `/api/webhooks/system`
- **Purpose**: Internal system monitoring and health checks
- **Required for**: System health monitoring, error alerts, analytics

#### Events Handled:
- Health check reports
- Database backup notifications
- User milestone achievements
- Error alerts and system maintenance

---

## 🚀 Production Setup Instructions

### Step 1: Configure Cashfree Webhooks
1. Login to [Cashfree Merchant Dashboard](https://merchant.cashfree.com)
2. Navigate to **Developers → Webhooks**
3. Add webhook URL: `https://yourdomain.com/api/cashfree/webhook`
4. Select events:
   - Payment Success
   - Payment Failed
   - Subscription Activated
   - Subscription Cancelled
   - Subscription Paused
5. Copy webhook secret to environment variables

### Step 2: Configure WhatsApp Business API
1. Go to [Meta for Developers](https://developers.facebook.com)
2. Select your WhatsApp Business app
3. Navigate to **WhatsApp → Configuration**
4. Set webhook URL: `https://yourdomain.com/api/whatsapp/webhook`
5. Subscribe to fields:
   - `messages`
   - `message_deliveries`
   - `message_reads`
   - `messaging_postbacks`

### Step 3: Configure Meta Webhooks (Optional but Recommended)
1. In Meta for Developers console
2. Navigate to **Webhooks**
3. Add webhook: `https://yourdomain.com/api/webhooks/meta`
4. Subscribe to:
   - `messages`
   - `messaging_optins`
   - `messaging_postbacks`
   - `message_template_status_update`

### Step 4: Test Webhook Endpoints
```bash
# Test Cashfree webhook
curl -X POST https://yourdomain.com/api/cashfree/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"test","data":{}}'

# Test WhatsApp webhook
curl -X GET "https://yourdomain.com/api/whatsapp/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=YOUR_VERIFY_TOKEN"

# Test Meta webhook
curl -X GET "https://yourdomain.com/api/webhooks/meta?hub.mode=subscribe&hub.challenge=test&hub.verify_token=YOUR_VERIFY_TOKEN"

# Test system webhook
curl -X POST https://yourdomain.com/api/webhooks/system \
  -H "Content-Type: application/json" \
  -d '{"type":"HEALTH_CHECK","data":{},"source":"manual_test"}'
```

---

## 🔒 Security Considerations

### Webhook Signature Verification
All webhooks implement signature verification:

1. **Cashfree**: HMAC SHA-256 with webhook secret
2. **Meta**: SHA-256 signature with app secret
3. **System**: Internal authentication

### IP Whitelisting (Recommended)
Configure your firewall to only allow webhook calls from:
- Cashfree IPs: [Check Cashfree docs for current IP ranges]
- Meta IPs: [Check Meta docs for current IP ranges]

### HTTPS Requirements
All webhooks MUST use HTTPS in production for security.

---

## 📊 Webhook Event Flow

### Daily SIP Payment Flow:
```
1. User subscribes → Cashfree creates subscription
2. Daily payment triggers → PAYMENT_SUCCESS webhook
3. System allocates plants → Updates database
4. WhatsApp notification → User receives update
5. System logs analytics → Dashboard updates
```

### WhatsApp Conversation Flow:
```
1. User sends message → WhatsApp webhook receives
2. System processes → Bot logic determines response
3. Response sent → WhatsApp API
4. Status updates → Meta webhook (optional)
5. Analytics logged → System webhook
```

---

## 🛠️ Webhook Management

### Monitoring Webhook Health
- All webhooks log to the analytics table
- System webhook provides health metrics
- Failed webhooks are retried with exponential backoff

### Webhook URLs by Environment:

#### Development:
- Cashfree: `http://localhost:3000/api/cashfree/webhook`
- WhatsApp: `http://localhost:3000/api/whatsapp/webhook`
- Meta: `http://localhost:3000/api/webhooks/meta`
- System: `http://localhost:3000/api/webhooks/system`

#### Production:
- Cashfree: `https://darjberry.com/api/cashfree/webhook`
- WhatsApp: `https://darjberry.com/api/whatsapp/webhook`
- Meta: `https://darjberry.com/api/webhooks/meta`
- System: `https://darjberry.com/api/webhooks/system`

---

## 🚨 Troubleshooting

### Common Issues:

1. **Webhook Not Receiving Events**
   - Check URL accessibility
   - Verify HTTPS certificate
   - Check firewall settings
   - Validate webhook configuration

2. **Signature Verification Failing**
   - Ensure correct webhook secret
   - Check timestamp tolerance
   - Verify signature format

3. **Database Connection Issues**
   - Check database connectivity
   - Verify environment variables
   - Check connection pooling

### Debug Endpoints:
- `GET /api/cashfree/webhook` - Check webhook status
- `GET /api/whatsapp/webhook` - WhatsApp verification
- `GET /api/webhooks/meta` - Meta verification
- `GET /api/webhooks/system` - System metrics

---

## 📈 Analytics & Monitoring

All webhook events are logged to the analytics table for:
- Performance monitoring
- Error tracking
- Business intelligence
- User behavior analysis

### Key Metrics Tracked:
- Payment success/failure rates
- WhatsApp message volume
- User engagement metrics
- System health status
- Subscription lifecycle events

---

## ✅ Production Checklist

Before going live, ensure:

- [ ] All webhook URLs configured in third-party services
- [ ] Environment variables set correctly
- [ ] HTTPS certificates valid
- [ ] Signature verification working
- [ ] Database connections stable
- [ ] Error handling implemented
- [ ] Monitoring and alerting setup
- [ ] Backup webhook URLs configured (if needed)
- [ ] Load testing completed
- [ ] Documentation updated

---

**🫐 Happy webhook configuration! Your Darjberry system will be fully automated and responsive to all payment and communication events.**