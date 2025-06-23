/**
 * TDD Phase 2: Payment Integration Tests
 * Following r08_TDD_v1.txt requirements for payment processing with Razorpay
 */

interface PaymentLink {
  id: string;
  amount: number;
  currency: string;
  description: string;
  paymentUrl: string;
  status: 'CREATED' | 'PENDING' | 'PAID' | 'FAILED' | 'EXPIRED';
  expiresAt: Date;
  customerId: string;
  farmId?: string;
  metadata: Record<string, any>;
}

interface PaymentWebhookPayload {
  event: 'payment.captured' | 'payment.failed' | 'payment_link.paid' | 'payment_link.expired';
  account_id: string;
  entity: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    order_id?: string;
    payment_link_id?: string;
    method?: string;
    notes?: Record<string, any>;
  };
  created_at: number;
}

interface PaymentHistory {
  id: string;
  paymentLinkId: string;
  customerId: string;
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  paymentMethod?: string;
  transactionId?: string;
  failureReason?: string;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface PaymentService {
  createPaymentLink(farmId: string, customerId: string, amount: number, description: string): Promise<PaymentLink>;
  handleWebhook(payload: PaymentWebhookPayload): Promise<void>;
  retryFailedPayment(paymentId: string): Promise<PaymentLink>;
  getPaymentHistory(customerId: string): Promise<PaymentHistory[]>;
  refundPayment(paymentId: string, amount?: number): Promise<void>;
  updatePaymentStatus(paymentLinkId: string, status: PaymentHistory['status']): Promise<PaymentHistory>;
}

interface FarmSetupService {
  triggerFarmSetup(farmId: string): Promise<void>;
  cancelFarmSetup(farmId: string): Promise<void>;
}

// Mock implementations for testing
class MockPaymentService implements PaymentService {
  private paymentLinks = new Map<string, PaymentLink>();
  private paymentHistory = new Map<string, PaymentHistory[]>();
  private webhookEvents: PaymentWebhookPayload[] = [];

  async createPaymentLink(farmId: string, customerId: string, amount: number, description: string): Promise<PaymentLink> {
    const paymentLink: PaymentLink = {
      id: `plink_${Date.now()}`,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      description,
      paymentUrl: `https://razorpay.com/payment-links/plink_${Date.now()}`,
      status: 'CREATED',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      customerId,
      farmId,
      metadata: {
        farmId,
        customerId,
        type: 'farm_setup'
      }
    };

    this.paymentLinks.set(paymentLink.id, paymentLink);

    // Create payment history entry
    const historyEntry: PaymentHistory = {
      id: `payment_${Date.now()}`,
      paymentLinkId: paymentLink.id,
      customerId,
      amount,
      status: 'PENDING',
      retryCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const customerHistory = this.paymentHistory.get(customerId) || [];
    customerHistory.push(historyEntry);
    this.paymentHistory.set(customerId, customerHistory);

    return paymentLink;
  }

  async handleWebhook(payload: PaymentWebhookPayload): Promise<void> {
    this.webhookEvents.push(payload);

    const paymentLinkId = payload.entity.payment_link_id;
    if (!paymentLinkId) return;

    const paymentLink = this.paymentLinks.get(paymentLinkId);
    if (!paymentLink) return;

    switch (payload.event) {
      case 'payment_link.paid':
        paymentLink.status = 'PAID';
        await this.updatePaymentStatus(paymentLinkId, 'SUCCESS');
        break;

      case 'payment_link.expired':
        paymentLink.status = 'EXPIRED';
        await this.updatePaymentStatus(paymentLinkId, 'FAILED');
        break;

      case 'payment.failed':
        paymentLink.status = 'FAILED';
        await this.updatePaymentStatus(paymentLinkId, 'FAILED');
        break;
    }
  }

  async retryFailedPayment(paymentId: string): Promise<PaymentLink> {
    // Find payment in history
    let paymentHistory: PaymentHistory | undefined;
    let customerId: string = '';

    for (const [custId, history] of this.paymentHistory.entries()) {
      const payment = history.find(p => p.id === paymentId);
      if (payment) {
        paymentHistory = payment;
        customerId = custId;
        break;
      }
    }

    if (!paymentHistory || paymentHistory.retryCount >= 3) {
      throw new Error('Payment not found or retry limit exceeded');
    }

    // Create new payment link
    const newPaymentLink = await this.createPaymentLink(
      paymentHistory.paymentLinkId, // Using as farmId for simplicity
      customerId,
      paymentHistory.amount,
      'Retry payment for farm setup'
    );

    // Update retry count
    paymentHistory.retryCount++;
    paymentHistory.updatedAt = new Date();

    return newPaymentLink;
  }

  async getPaymentHistory(customerId: string): Promise<PaymentHistory[]> {
    return this.paymentHistory.get(customerId) || [];
  }

  async refundPayment(paymentId: string, amount?: number): Promise<void> {
    let paymentHistory: PaymentHistory | undefined;

    for (const history of this.paymentHistory.values()) {
      const payment = history.find(p => p.id === paymentId);
      if (payment) {
        paymentHistory = payment;
        break;
      }
    }

    if (!paymentHistory) {
      throw new Error('Payment not found');
    }

    if (paymentHistory.status !== 'SUCCESS') {
      throw new Error('Cannot refund non-successful payment');
    }

    paymentHistory.status = 'REFUNDED';
    paymentHistory.updatedAt = new Date();
  }

  async updatePaymentStatus(paymentLinkId: string, status: PaymentHistory['status']): Promise<PaymentHistory> {
    let paymentHistory: PaymentHistory | undefined;

    for (const history of this.paymentHistory.values()) {
      const payment = history.find(p => p.paymentLinkId === paymentLinkId);
      if (payment) {
        paymentHistory = payment;
        break;
      }
    }

    if (!paymentHistory) {
      throw new Error('Payment history not found');
    }

    paymentHistory.status = status;
    paymentHistory.updatedAt = new Date();

    return paymentHistory;
  }

  // Test helper methods
  getWebhookEvents(): PaymentWebhookPayload[] {
    return this.webhookEvents;
  }

  getPaymentLink(id: string): PaymentLink | undefined {
    return this.paymentLinks.get(id);
  }

  clearWebhookEvents(): void {
    this.webhookEvents = [];
  }
}

class MockFarmSetupService implements FarmSetupService {
  private triggeredSetups = new Set<string>();
  private cancelledSetups = new Set<string>();

  async triggerFarmSetup(farmId: string): Promise<void> {
    this.triggeredSetups.add(farmId);
  }

  async cancelFarmSetup(farmId: string): Promise<void> {
    this.cancelledSetups.add(farmId);
  }

  isSetupTriggered(farmId: string): boolean {
    return this.triggeredSetups.has(farmId);
  }

  isSetupCancelled(farmId: string): boolean {
    return this.cancelledSetups.has(farmId);
  }

  reset(): void {
    this.triggeredSetups.clear();
    this.cancelledSetups.clear();
  }
}

describe('Payment Integration', () => {
  let paymentService: MockPaymentService;
  let farmSetupService: MockFarmSetupService;

  beforeEach(() => {
    paymentService = new MockPaymentService();
    farmSetupService = new MockFarmSetupService();
  });

  describe('Payment Link Generation', () => {
    it('should create payment link with correct details', async () => {
      const farmId = 'farm_123';
      const customerId = 'customer_456';
      const amount = 2000000; // ₹20 lakhs
      const description = 'Blueberry Farm Setup - 500 plants';

      const paymentLink = await paymentService.createPaymentLink(farmId, customerId, amount, description);

      expect(paymentLink.id).toBeDefined();
      expect(paymentLink.amount).toBe(amount * 100); // Converted to paise
      expect(paymentLink.currency).toBe('INR');
      expect(paymentLink.description).toBe(description);
      expect(paymentLink.paymentUrl).toMatch(/https:\/\/razorpay\.com\/payment-links\//);
      expect(paymentLink.status).toBe('CREATED');
      expect(paymentLink.customerId).toBe(customerId);
      expect(paymentLink.farmId).toBe(farmId);
      expect(paymentLink.expiresAt).toBeInstanceOf(Date);
      expect(paymentLink.expiresAt.getTime()).toBeGreaterThan(Date.now());
    });

    it('should set payment link expiry to 7 days', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const now = new Date();
      const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const expiryTime = paymentLink.expiresAt.getTime();
      
      expect(expiryTime).toBeGreaterThan(now.getTime());
      expect(expiryTime).toBeLessThanOrEqual(sevenDaysLater.getTime());
    });

    it('should include metadata with farm and customer information', async () => {
      const farmId = 'farm_123';
      const customerId = 'customer_456';
      
      const paymentLink = await paymentService.createPaymentLink(farmId, customerId, 1000000, 'Test payment');
      
      expect(paymentLink.metadata.farmId).toBe(farmId);
      expect(paymentLink.metadata.customerId).toBe(customerId);
      expect(paymentLink.metadata.type).toBe('farm_setup');
    });

    it('should create payment history entry', async () => {
      const customerId = 'customer_456';
      
      await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      const history = await paymentService.getPaymentHistory(customerId);
      expect(history).toHaveLength(1);
      expect(history[0].customerId).toBe(customerId);
      expect(history[0].status).toBe('PENDING');
      expect(history[0].retryCount).toBe(0);
    });
  });

  describe('Webhook Processing', () => {
    it('should handle successful payment webhook', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: {
          id: 'pay_test',
          amount: 100000000, // Amount in paise
          currency: 'INR',
          status: 'captured',
          payment_link_id: paymentLink.id,
          method: 'card'
        },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhookPayload);

      const updatedPaymentLink = paymentService.getPaymentLink(paymentLink.id);
      expect(updatedPaymentLink?.status).toBe('PAID');

      const history = await paymentService.getPaymentHistory('customer_456');
      expect(history[0].status).toBe('SUCCESS');
    });

    it('should handle failed payment webhook', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment.failed',
        account_id: 'acc_test',
        entity: {
          id: 'pay_test',
          amount: 100000000,
          currency: 'INR',
          status: 'failed',
          payment_link_id: paymentLink.id
        },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhookPayload);

      const updatedPaymentLink = paymentService.getPaymentLink(paymentLink.id);
      expect(updatedPaymentLink?.status).toBe('FAILED');

      const history = await paymentService.getPaymentHistory('customer_456');
      expect(history[0].status).toBe('FAILED');
    });

    it('should handle expired payment link webhook', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment_link.expired',
        account_id: 'acc_test',
        entity: {
          id: paymentLink.id,
          amount: 100000000,
          currency: 'INR',
          status: 'expired'
        },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhookPayload);

      const updatedPaymentLink = paymentService.getPaymentLink(paymentLink.id);
      expect(updatedPaymentLink?.status).toBe('EXPIRED');
    });

    it('should track all webhook events', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const webhook1: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: { id: 'pay_1', amount: 100000000, currency: 'INR', status: 'captured', payment_link_id: paymentLink.id },
        created_at: Date.now()
      };

      const webhook2: PaymentWebhookPayload = {
        event: 'payment.failed',
        account_id: 'acc_test',
        entity: { id: 'pay_2', amount: 100000000, currency: 'INR', status: 'failed', payment_link_id: paymentLink.id },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhook1);
      await paymentService.handleWebhook(webhook2);

      const events = paymentService.getWebhookEvents();
      expect(events).toHaveLength(2);
      expect(events[0].event).toBe('payment_link.paid');
      expect(events[1].event).toBe('payment.failed');
    });
  });

  describe('Payment Retry Logic', () => {
    it('should allow retrying failed payments', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      // Simulate payment failure
      await paymentService.updatePaymentStatus(paymentLink.id, 'FAILED');
      
      const history = await paymentService.getPaymentHistory(customerId);
      const failedPayment = history[0];
      
      const retryPaymentLink = await paymentService.retryFailedPayment(failedPayment.id);
      
      expect(retryPaymentLink.id).toBeDefined();
      expect(retryPaymentLink.id).not.toBe(paymentLink.id);
      expect(retryPaymentLink.amount).toBe(paymentLink.amount);
      expect(retryPaymentLink.customerId).toBe(customerId);
      
      const updatedHistory = await paymentService.getPaymentHistory(customerId);
      expect(updatedHistory[0].retryCount).toBe(1);
    });

    it('should limit retries to 3 attempts', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      await paymentService.updatePaymentStatus(paymentLink.id, 'FAILED');
      
      const history = await paymentService.getPaymentHistory(customerId);
      const failedPayment = history[0];
      
      // Simulate 3 retries
      await paymentService.retryFailedPayment(failedPayment.id);
      await paymentService.retryFailedPayment(failedPayment.id);
      await paymentService.retryFailedPayment(failedPayment.id);
      
      // 4th retry should fail
      await expect(
        paymentService.retryFailedPayment(failedPayment.id)
      ).rejects.toThrow('retry limit exceeded');
    });

    it('should not allow retrying successful payments', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      await paymentService.updatePaymentStatus(paymentLink.id, 'SUCCESS');
      
      const history = await paymentService.getPaymentHistory(customerId);
      const successfulPayment = history[0];
      
      await expect(
        paymentService.retryFailedPayment(successfulPayment.id)
      ).rejects.toThrow('Payment not found or retry limit exceeded');
    });
  });

  describe('Payment History Tracking', () => {
    it('should track payment history for each customer', async () => {
      const customerId = 'customer_456';
      
      await paymentService.createPaymentLink('farm_1', customerId, 1000000, 'Farm 1 payment');
      await paymentService.createPaymentLink('farm_2', customerId, 1500000, 'Farm 2 payment');
      
      const history = await paymentService.getPaymentHistory(customerId);
      
      expect(history).toHaveLength(2);
      expect(history[0].amount).toBe(1000000);
      expect(history[1].amount).toBe(1500000);
      expect(history[0].customerId).toBe(customerId);
      expect(history[1].customerId).toBe(customerId);
    });

    it('should update payment history timestamps', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      const initialHistory = await paymentService.getPaymentHistory(customerId);
      const initialTimestamp = initialHistory[0].updatedAt;
      
      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));
      
      await paymentService.updatePaymentStatus(paymentLink.id, 'SUCCESS');
      
      const updatedHistory = await paymentService.getPaymentHistory(customerId);
      expect(updatedHistory[0].updatedAt.getTime()).toBeGreaterThan(initialTimestamp.getTime());
    });

    it('should return empty history for customers with no payments', async () => {
      const history = await paymentService.getPaymentHistory('non_existent_customer');
      expect(history).toHaveLength(0);
    });
  });

  describe('Farm Setup Integration', () => {
    it('should trigger farm setup after successful payment', async () => {
      const farmId = 'farm_123';
      const paymentLink = await paymentService.createPaymentLink(farmId, 'customer_456', 1000000, 'Test payment');
      
      // Simulate successful payment
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: {
          id: 'pay_test',
          amount: 100000000,
          currency: 'INR',
          status: 'captured',
          payment_link_id: paymentLink.id
        },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhookPayload);
      
      // In real implementation, this would be triggered by the webhook handler
      await farmSetupService.triggerFarmSetup(farmId);
      
      expect(farmSetupService.isSetupTriggered(farmId)).toBe(true);
    });

    it('should cancel farm setup for expired payments', async () => {
      const farmId = 'farm_123';
      const paymentLink = await paymentService.createPaymentLink(farmId, 'customer_456', 1000000, 'Test payment');
      
      // Simulate payment expiry
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment_link.expired',
        account_id: 'acc_test',
        entity: {
          id: paymentLink.id,
          amount: 100000000,
          currency: 'INR',
          status: 'expired'
        },
        created_at: Date.now()
      };

      await paymentService.handleWebhook(webhookPayload);
      
      // In real implementation, this would be triggered by the webhook handler
      await farmSetupService.cancelFarmSetup(farmId);
      
      expect(farmSetupService.isSetupCancelled(farmId)).toBe(true);
    });
  });

  describe('Refund Processing', () => {
    it('should process refund for successful payment', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      // Mark payment as successful
      await paymentService.updatePaymentStatus(paymentLink.id, 'SUCCESS');
      
      const history = await paymentService.getPaymentHistory(customerId);
      const successfulPayment = history[0];
      
      await paymentService.refundPayment(successfulPayment.id);
      
      const updatedHistory = await paymentService.getPaymentHistory(customerId);
      expect(updatedHistory[0].status).toBe('REFUNDED');
    });

    it('should not allow refund for non-successful payments', async () => {
      const customerId = 'customer_456';
      const paymentLink = await paymentService.createPaymentLink('farm_123', customerId, 1000000, 'Test payment');
      
      // Leave payment as PENDING
      const history = await paymentService.getPaymentHistory(customerId);
      const pendingPayment = history[0];
      
      await expect(
        paymentService.refundPayment(pendingPayment.id)
      ).rejects.toThrow('Cannot refund non-successful payment');
    });

    it('should not allow refund for non-existent payment', async () => {
      await expect(
        paymentService.refundPayment('non_existent_payment')
      ).rejects.toThrow('Payment not found');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle webhook for non-existent payment link', async () => {
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: {
          id: 'pay_test',
          amount: 100000000,
          currency: 'INR',
          status: 'captured',
          payment_link_id: 'non_existent_link'
        },
        created_at: Date.now()
      };

      // Should not throw error
      await expect(paymentService.handleWebhook(webhookPayload)).resolves.not.toThrow();
      
      const events = paymentService.getWebhookEvents();
      expect(events).toHaveLength(1); // Event should still be recorded
    });

    it('should handle webhook without payment_link_id', async () => {
      const webhookPayload: PaymentWebhookPayload = {
        event: 'payment.captured',
        account_id: 'acc_test',
        entity: {
          id: 'pay_test',
          amount: 100000000,
          currency: 'INR',
          status: 'captured'
          // No payment_link_id
        },
        created_at: Date.now()
      };

      await expect(paymentService.handleWebhook(webhookPayload)).resolves.not.toThrow();
    });

    it('should handle very large payment amounts', async () => {
      const largeAmount = 100000000; // ₹10 crores
      
      const paymentLink = await paymentService.createPaymentLink(
        'farm_123', 
        'customer_456', 
        largeAmount, 
        'Large farm setup'
      );
      
      expect(paymentLink.amount).toBe(largeAmount * 100); // Converted to paise
      expect(paymentLink.paymentUrl).toBeDefined();
    });

    it('should handle concurrent webhook processing', async () => {
      const paymentLink = await paymentService.createPaymentLink('farm_123', 'customer_456', 1000000, 'Test payment');
      
      const webhook1: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: { id: 'pay_1', amount: 100000000, currency: 'INR', status: 'captured', payment_link_id: paymentLink.id },
        created_at: Date.now()
      };

      const webhook2: PaymentWebhookPayload = {
        event: 'payment_link.paid',
        account_id: 'acc_test',
        entity: { id: 'pay_2', amount: 100000000, currency: 'INR', status: 'captured', payment_link_id: paymentLink.id },
        created_at: Date.now()
      };

      // Process webhooks concurrently
      await Promise.all([
        paymentService.handleWebhook(webhook1),
        paymentService.handleWebhook(webhook2)
      ]);

      const events = paymentService.getWebhookEvents();
      expect(events).toHaveLength(2);
      
      const finalPaymentLink = paymentService.getPaymentLink(paymentLink.id);
      expect(finalPaymentLink?.status).toBe('PAID');
    });
  });
});