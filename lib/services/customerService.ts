import { PrismaClient } from '@prisma/client';
import { validatePhoneNumber, normalizePhoneNumber } from './otpService';

const prisma = new PrismaClient();

export interface CreateCustomerDTO {
  phoneNumber: string;
  name?: string;
  email?: string;
  location?: string;
  landSize?: number;
  landType?: string;
  referralCode?: string;
  referredBy?: string;
}

export interface UpdateCustomerDTO {
  name?: string;
  email?: string;
  location?: string;
  landSize?: number;
  landType?: string;
  state?: string;
  leadScore?: number;
  lastInteraction?: Date;
}

export interface CustomerFilter {
  state?: string;
  landType?: string;
  leadScoreMin?: number;
  leadScoreMax?: number;
  createdAfter?: Date;
  createdBefore?: Date;
}

export interface Customer {
  id: string;
  phoneNumber: string;
  name: string | null;
  email: string | null;
  state: string;
  location: string | null;
  landSize: number | null;
  landType: string | null;
  leadScore: number;
  lastInteraction: Date;
  createdAt: Date;
  updatedAt: Date;
  referralCode: string | null;
  referredBy: string | null;
}

export interface CustomerWithRelations extends Customer {
  messages: any[];
  landAnalysis: any[];
  investments: any[];
  sipInvestments: any[];
  berryPlots: any[];
  memberBenefits: any | null;
}

export class CustomerService {
  /**
   * Create a new customer with validation
   */
  async create(data: CreateCustomerDTO): Promise<Customer> {
    // Validate phone number
    if (!validatePhoneNumber(data.phoneNumber)) {
      throw new Error('Invalid phone number format');
    }

    const phoneNumber = normalizePhoneNumber(data.phoneNumber);

    // Check if customer already exists
    const existingCustomer = await prisma.whatsAppUser.findUnique({
      where: { phoneNumber }
    });

    if (existingCustomer) {
      throw new Error('Customer with this phone number already exists');
    }

    // Validate email if provided
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    // Generate unique referral code
    const referralCode = await this.generateUniqueReferralCode();

    // Create customer
    const customer = await prisma.whatsAppUser.create({
      data: {
        phoneNumber,
        name: data.name || null,
        email: data.email || null,
        location: data.location || null,
        landSize: data.landSize || null,
        landType: data.landType || null,
        referralCode,
        referredBy: data.referredBy || null,
        state: 'NEW',
        leadScore: 0,
        lastInteraction: new Date(),
      }
    });

    // Initialize member benefits if customer is created successfully
    await this.initializeMemberBenefits(customer.id);

    return customer;
  }

  /**
   * Get customer by ID
   */
  async getById(id: string): Promise<Customer | null> {
    return await prisma.whatsAppUser.findUnique({
      where: { id }
    });
  }

  /**
   * Get customer by phone number
   */
  async getByPhoneNumber(phoneNumber: string): Promise<Customer | null> {
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    return await prisma.whatsAppUser.findUnique({
      where: { phoneNumber: normalizedPhone }
    });
  }

  /**
   * Get customer with all related data
   */
  async getByIdWithRelations(id: string): Promise<CustomerWithRelations | null> {
    return await prisma.whatsAppUser.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 10
        },
        landAnalysis: {
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        investments: {
          orderBy: { proposalSentAt: 'desc' }
        },
        sipInvestments: {
          orderBy: { startDate: 'desc' }
        },
        berryPlots: {
          orderBy: { acquisitionDate: 'desc' }
        },
        memberBenefits: true
      }
    });
  }

  /**
   * Update customer information
   */
  async update(id: string, data: UpdateCustomerDTO): Promise<Customer> {
    // Validate email if provided
    if (data.email && !this.isValidEmail(data.email)) {
      throw new Error('Invalid email format');
    }

    // Check if customer exists
    const existingCustomer = await this.getById(id);
    if (!existingCustomer) {
      throw new Error('Customer not found');
    }

    const updatedCustomer = await prisma.whatsAppUser.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        ...(data.state && { lastInteraction: new Date() })
      }
    });

    return updatedCustomer;
  }

  /**
   * Soft delete customer (mark as inactive)
   */
  async softDelete(id: string): Promise<boolean> {
    try {
      await prisma.whatsAppUser.update({
        where: { id },
        data: {
          state: 'INACTIVE',
          updatedAt: new Date()
        }
      });
      return true;
    } catch (error) {
      console.error('Error soft deleting customer:', error);
      return false;
    }
  }

  /**
   * Get customers with pagination and filtering
   */
  async getAll(
    page: number = 1,
    limit: number = 20,
    filter?: CustomerFilter
  ): Promise<{ customers: Customer[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter) {
      if (filter.state) where.state = filter.state;
      if (filter.landType) where.landType = filter.landType;
      if (filter.leadScoreMin || filter.leadScoreMax) {
        where.leadScore = {};
        if (filter.leadScoreMin) where.leadScore.gte = filter.leadScoreMin;
        if (filter.leadScoreMax) where.leadScore.lte = filter.leadScoreMax;
      }
      if (filter.createdAfter || filter.createdBefore) {
        where.createdAt = {};
        if (filter.createdAfter) where.createdAt.gte = filter.createdAfter;
        if (filter.createdBefore) where.createdAt.lte = filter.createdBefore;
      }
    }

    const [customers, total] = await Promise.all([
      prisma.whatsAppUser.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.whatsAppUser.count({ where })
    ]);

    return {
      customers,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Update customer state (for WhatsApp flow management)
   */
  async updateState(id: string, newState: string): Promise<Customer> {
    return await this.update(id, {
      state: newState
    });
  }

  /**
   * Update lead score based on interactions
   */
  async updateLeadScore(id: string, scoreIncrement: number): Promise<Customer> {
    const customer = await this.getById(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const newScore = Math.max(0, Math.min(100, customer.leadScore + scoreIncrement));

    return await this.update(id, {
      leadScore: newScore
    });
  }

  /**
   * Record customer interaction (updates lastInteraction)
   */
  async recordInteraction(id: string): Promise<Customer> {
    return await this.update(id, {
      lastInteraction: new Date()
    });
  }

  /**
   * Find or create customer (useful for WhatsApp interactions)
   */
  async findOrCreate(phoneNumber: string, initialData?: Partial<CreateCustomerDTO>): Promise<Customer> {
    const existingCustomer = await this.getByPhoneNumber(phoneNumber);
    
    if (existingCustomer) {
      // Update last interaction
      return await this.recordInteraction(existingCustomer.id);
    }

    // Create new customer
    return await this.create({
      phoneNumber,
      ...initialData
    });
  }

  /**
   * Get customers by referral code (for referral tracking)
   */
  async getByReferralCode(referralCode: string): Promise<Customer | null> {
    return await prisma.whatsAppUser.findUnique({
      where: { referralCode }
    });
  }

  /**
   * Get referred customers (customers referred by a specific customer)
   */
  async getReferredCustomers(referredBy: string): Promise<Customer[]> {
    return await prisma.whatsAppUser.findMany({
      where: { referredBy },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Calculate customer health score based on engagement, investments, etc.
   */
  async calculateCustomerHealth(id: string): Promise<number> {
    const customer = await this.getByIdWithRelations(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    let healthScore = 0;

    // Base score for having profile data
    if (customer.name) healthScore += 10;
    if (customer.email) healthScore += 10;
    if (customer.location) healthScore += 10;
    if (customer.landSize) healthScore += 10;

    // Engagement score
    const daysSinceLastInteraction = Math.floor(
      (Date.now() - customer.lastInteraction.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceLastInteraction <= 1) healthScore += 20;
    else if (daysSinceLastInteraction <= 7) healthScore += 15;
    else if (daysSinceLastInteraction <= 30) healthScore += 10;

    // Investment activity
    healthScore += Math.min(20, customer.investments.length * 5);
    healthScore += Math.min(20, customer.sipInvestments.length * 10);

    // Land analysis activity
    healthScore += Math.min(10, customer.landAnalysis.length * 2);

    return Math.min(100, healthScore);
  }

  /**
   * Get customer analytics summary
   */
  async getCustomerAnalytics(id: string): Promise<{
    totalInvestments: number;
    totalInvestedAmount: number;
    activeSIPs: number;
    totalPlots: number;
    engagementScore: number;
    customerValue: 'HIGH' | 'MEDIUM' | 'LOW';
  }> {
    const customer = await this.getByIdWithRelations(id);
    if (!customer) {
      throw new Error('Customer not found');
    }

    const totalInvestments = customer.investments.length;
    const totalInvestedAmount = customer.sipInvestments.reduce(
      (sum, sip) => sum + sip.totalInvested, 0
    );
    const activeSIPs = customer.sipInvestments.filter(sip => sip.status === 'ACTIVE').length;
    const totalPlots = customer.berryPlots.length;
    const engagementScore = await this.calculateCustomerHealth(id);

    let customerValue: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
    if (totalInvestedAmount > 500000) customerValue = 'HIGH';
    else if (totalInvestedAmount > 100000 || activeSIPs > 0) customerValue = 'MEDIUM';

    return {
      totalInvestments,
      totalInvestedAmount,
      activeSIPs,
      totalPlots,
      engagementScore,
      customerValue
    };
  }

  // Private helper methods

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private async generateUniqueReferralCode(): Promise<string> {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const code = this.generateReferralCode();
      const existing = await prisma.whatsAppUser.findUnique({
        where: { referralCode: code }
      });

      if (!existing) {
        return code;
      }

      attempts++;
    }

    // Fallback to timestamp-based code if all attempts fail
    return `REF${Date.now().toString().slice(-6)}`;
  }

  private generateReferralCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'BERRY';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private async initializeMemberBenefits(customerId: string): Promise<void> {
    const customer = await this.getById(customerId);
    if (!customer) return;

    await prisma.memberBenefits.create({
      data: {
        phoneNumber: customer.phoneNumber,
        farmStayNights: 2,
        berryBoxes: 4,
        teaEstateTours: 1,
        referralCredits: 0,
        longevityTests: 0
      }
    });
  }
}

// Singleton instance
export const customerService = new CustomerService();