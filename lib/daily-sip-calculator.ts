export interface DailySIPCalculation {
  dailyAmount: number;
  monthlyAmount: number; // dailyAmount * 30
  annualAmount: number;  // dailyAmount * 365
  totalInvestment: number;
  plantsAllocated: number; // 100 plants per ₹10k daily
  landRequirement: string; // "Your own land" or "Coming soon: Darjeeling lease"
  expectedDividends: {
    year3: { min: number; max: number };
    year4: { min: number; max: number };
    year5: { min: number; max: number };
  };
  darjeelingPerks: {
    farmStayValue: number;
    berryBoxValue: number;
    teaEstateTours: number;
    totalPerkValue: number;
  };
  currentOption: {
    type: 'own_land' | 'darjeeling_lease_soon';
    description: string;
    requirements: string[];
  };
}

export class DailySIPCalculator {
  private static readonly PLANTS_PER_MONTH = 100; // 100 plants per month including setup
  private static readonly MONTHLY_INVESTMENT_FOR_100_PLANTS = 300000; // ₹3 lakhs per month for 100 plants
  private static readonly ANNUAL_FARM_STAY_VALUE = 25000; // Premium Darjeeling stay
  private static readonly ANNUAL_BERRY_BOX_VALUE = 12000; // Premium berries
  private static readonly TEA_ESTATE_TOUR_VALUE = 8000; // Exclusive tea estate access
  
  static calculate(dailyAmount: number, days: number = 365): DailySIPCalculation {
    const monthlyAmount = dailyAmount * 30;
    const annualAmount = dailyAmount * 365;
    const totalInvestment = dailyAmount * days;
    
    // Plant allocation: 100 plants per ₹3 lakh monthly (₹10k daily)
    const monthsOfInvestment = Math.floor(totalInvestment / this.MONTHLY_INVESTMENT_FOR_100_PLANTS);
    const plantsAllocated = monthsOfInvestment * this.PLANTS_PER_MONTH;
    
    // Calculate dividends based on plants (not plots)
    const expectedDividends = {
      year3: {
        min: plantsAllocated * 80,   // ₹80 per plant minimum
        max: plantsAllocated * 120   // ₹120 per plant maximum
      },
      year4: {
        min: plantsAllocated * 120,
        max: plantsAllocated * 180
      },
      year5: {
        min: plantsAllocated * 180,
        max: plantsAllocated * 250 // Premium export quality
      }
    };
    
    const darjeelingPerks = {
      farmStayValue: this.ANNUAL_FARM_STAY_VALUE,
      berryBoxValue: this.ANNUAL_BERRY_BOX_VALUE,
      teaEstateTours: this.TEA_ESTATE_TOUR_VALUE,
      totalPerkValue: this.ANNUAL_FARM_STAY_VALUE + this.ANNUAL_BERRY_BOX_VALUE + this.TEA_ESTATE_TOUR_VALUE
    };
    
    // Current model: Own land only, Darjeeling lease coming soon
    const currentOption = {
      type: 'own_land' as const,
      description: 'Grow blueberries on your own agricultural land',
      requirements: [
        'You provide the land (minimum 0.25 acres)',
        'We provide plants, setup, and expertise',
        'Perfect for tea estate owners looking to diversify'
      ]
    };
    
    return {
      dailyAmount,
      monthlyAmount,
      annualAmount,
      totalInvestment,
      plantsAllocated,
      landRequirement: dailyAmount >= 10000 ? 'Your own land (0.25+ acres per 100 plants)' : 'Increase to ₹10k daily (₹3L monthly) for 100 plants',
      expectedDividends,
      darjeelingPerks,
      currentOption
    };
  }
  
  static generateReferralCode(_phoneNumber: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 4);
    return `DJG${timestamp}${random}`.toUpperCase();
  }
  
  static calculatePlotAllocation(totalInvested: number): number {
    const PLOT_COST = 50000; // ₹50,000 per plot
    return Math.floor(totalInvested / PLOT_COST);
  }
  
  static getNextPlotMilestone(totalInvested: number): {
    nextPlotAt: number;
    amountNeeded: number;
    daysToGo: number;
  } {
    const currentPlots = this.calculatePlotAllocation(totalInvested);
    const PLOT_COST = 50000; // ₹50,000 per plot
    const nextPlotCost = (currentPlots + 1) * PLOT_COST;
    const amountNeeded = nextPlotCost - totalInvested;
    
    return {
      nextPlotAt: nextPlotCost,
      amountNeeded,
      daysToGo: Math.ceil(amountNeeded / 10000) // Assuming ₹10k daily
    };
  }
  
  // Tax calculation specific to cooperative structure
  static calculateTaxBenefits(annualInvestment: number, userIncomeSlab: number): {
    agriculturalExemption: number;
    cooperativeExemption: number;
    totalSavings: number;
  } {
    // Agricultural income is 100% tax-free
    const agriculturalExemption = annualInvestment * (userIncomeSlab / 100);
    
    // Cooperative profits under Section 80P
    const cooperativeExemption = annualInvestment * 0.1; // Estimated 10% additional benefit
    
    return {
      agriculturalExemption,
      cooperativeExemption,
      totalSavings: agriculturalExemption + cooperativeExemption
    };
  }
}