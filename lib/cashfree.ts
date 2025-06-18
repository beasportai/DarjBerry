interface CashfreeConfig {
  clientId: string;
  clientSecret: string;
  environment: 'TEST' | 'PROD';
}

interface SubscriptionPlan {
  planId: string;
  planName: string;
  type: 'PERIODIC';
  maxCycles: number;
  intervalType: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  intervals: number;
  amount: number;
  currency: 'INR';
  description: string;
}

interface CustomerDetails {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface SubscriptionRequest {
  subscriptionId: string;
  planId: string;
  customerDetails: CustomerDetails;
  subscriptionNote?: string;
  subscriptionTags?: Record<string, string>;
  subscriptionMeta?: Record<string, any>;
  authorizationAmount?: number;
  subscriptionExpiryTime?: string;
  returnUrl?: string;
  subscriptionSessionTags?: Record<string, string>;
}

interface CashfreeSubscriptionResponse {
  cfSubscriptionId: string;
  subscriptionId: string;
  subscriptionStatus: 'ACTIVE' | 'CANCELLED' | 'BANK_APPROVAL_PENDING' | 'AUTHORIZATION_FAILED';
  authorizationDetails?: {
    authorizationAmount: number;
    authorizationReference: string;
    authorizationTime: string;
    authorizationStatus: 'SUCCESS' | 'FAILED' | 'PENDING';
  };
  subscriptionSessionId?: string;
  subscriptionPaymentLink?: string;
}

class CashfreeService {
  private config: CashfreeConfig;
  private baseUrl: string;

  constructor(config: CashfreeConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'PROD' 
      ? 'https://api.cashfree.com/api/v2'
      : 'https://test.cashfree.com/api/v2';
  }

  private async getAuthToken(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/cftoken/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': this.config.clientId,
        'x-client-secret': this.config.clientSecret,
      }
    });
    
    if (!response.ok) {
      throw new Error(`Cashfree auth failed: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.cftoken;
  }

  async createSubscriptionPlan(plan: SubscriptionPlan): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}/subscriptions/plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify(plan)
    });

    if (!response.ok) {
      throw new Error(`Failed to create plan: ${response.statusText}`);
    }

    return response.json();
  }

  async createSubscription(subscriptionData: SubscriptionRequest): Promise<CashfreeSubscriptionResponse> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify(subscriptionData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create subscription: ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async getSubscription(subscriptionId: string): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-version': '2022-09-01',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get subscription: ${response.statusText}`);
    }

    return response.json();
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-version': '2022-09-01',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to cancel subscription: ${response.statusText}`);
    }

    return response.json();
  }

  async updateSubscription(subscriptionId: string, updateData: Partial<SubscriptionRequest>): Promise<any> {
    const token = await this.getAuthToken();
    
    const response = await fetch(`${this.baseUrl}/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-version': '2022-09-01',
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error(`Failed to update subscription: ${response.statusText}`);
    }

    return response.json();
  }

  generateDarjberryPlans() {
    return {
      dailySIP: {
        planId: 'DARJBERRY_DAILY_10K',
        planName: 'Darjberry Daily SIP ₹10,000',
        type: 'PERIODIC' as const,
        maxCycles: 365,
        intervalType: 'DAILY' as const,
        intervals: 1,
        amount: 10000,
        currency: 'INR' as const,
        description: 'Daily ₹10,000 investment in Darjeeling blueberry farms with tax-free returns'
      },
      lumpsum3L: {
        planId: 'DARJBERRY_LUMPSUM_3L',
        planName: 'Darjberry Lumpsum ₹3 Lakh',
        type: 'PERIODIC' as const,
        maxCycles: 1,
        intervalType: 'MONTHLY' as const,
        intervals: 1,
        amount: 300000,
        currency: 'INR' as const,
        description: 'One-time ₹3 lakh investment for premium blueberry farming setup'
      },
      monthly30K: {
        planId: 'DARJBERRY_MONTHLY_30K',
        planName: 'Darjberry Monthly ₹30,000',
        type: 'PERIODIC' as const,
        maxCycles: 120,
        intervalType: 'MONTHLY' as const,
        intervals: 1,
        amount: 30000,
        currency: 'INR' as const,
        description: 'Monthly ₹30,000 for systematic blueberry farm investment'
      }
    };
  }
}

export { CashfreeService, type SubscriptionPlan, type CustomerDetails, type SubscriptionRequest, type CashfreeSubscriptionResponse };