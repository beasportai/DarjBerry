export interface InvestmentCalculation {
  acres: number;
  plants: number;
  totalCost: number;
  setupCost: number;
  annualOperatingCost: number;
  expectedYield: number; // kg per year from year 4+
  expectedRevenue: number; // annual revenue from year 4+
  netProfit: number; // annual profit from year 4+
  roiYears: number;
  paybackPeriod: number;
  fiveYearProfit: number;
  tenYearProfit: number;
  twentyYearProfit: number;
  irr: number; // Internal Rate of Return
  breakdownCosts: {
    polyhouse: number;
    plants: number;
    soilPreparation: number;
    irrigation: number;
    labor: number;
    transportation: number;
    consulting: number;
    contingency: number;
  };
  projections: Array<{
    year: number;
    yield: number;
    revenue: number;
    operatingCost: number;
    fursatCommission: number;
    netProfit: number;
    cumulativeCashFlow: number;
  }>;
}

export class InvestmentCalculator {
  // Base costs per 100 plants (0.25 acres)
  private static readonly BASE_COSTS = {
    polyhouse: 150000, // ₹1.5 lakhs
    plants: 50000, // ₹50k for 100 plants
    soilPreparation: 30000,
    irrigation: 40000,
    labor: 25000,
    transportation: 15000,
    consulting: 20000,
    contingency: 20000,
  };

  private static readonly PLANTS_PER_ACRE = 2200; // Updated to match CLAUDE.md (1.8 sq mt per plant)
  private static readonly ANNUAL_OPERATING_COST_PER_100_PLANTS = 144000; // ₹1.44 lakhs
  private static readonly FURSAT_COMMISSION = 0.10; // 10% as per CLAUDE.md
  private static readonly AVERAGE_PRICE_PER_KG = 800; // ₹800/kg as per CLAUDE.md
  
  // Production pattern (kg per plant per year) - Updated to match CLAUDE.md
  private static readonly PRODUCTION_PATTERN = [0, 0.5, 1, 2, 3, 3]; // Year 0-5

  static calculate(acres: number, pricePerKg: number = this.AVERAGE_PRICE_PER_KG): InvestmentCalculation {
    const plants = Math.round(acres * this.PLANTS_PER_ACRE);
    const plantsGroup = Math.ceil(plants / 100); // Number of 100-plant groups
    
    // Calculate setup costs
    const breakdownCosts = {
      polyhouse: this.BASE_COSTS.polyhouse * plantsGroup,
      plants: this.BASE_COSTS.plants * plantsGroup,
      soilPreparation: this.BASE_COSTS.soilPreparation * plantsGroup,
      irrigation: this.BASE_COSTS.irrigation * plantsGroup,
      labor: this.BASE_COSTS.labor * plantsGroup,
      transportation: this.BASE_COSTS.transportation * plantsGroup,
      consulting: this.BASE_COSTS.consulting * plantsGroup,
      contingency: this.BASE_COSTS.contingency * plantsGroup,
    };

    const setupCost = Object.values(breakdownCosts).reduce((a, b) => a + b, 0);
    const annualOperatingCost = this.ANNUAL_OPERATING_COST_PER_100_PLANTS * plantsGroup;

    // Calculate production and revenue using dynamic price
    const matureYield = plants * this.PRODUCTION_PATTERN[4]; // kg per year from year 4+ (3kg/plant)
    const expectedRevenue = matureYield * pricePerKg;
    const fursatCommission = expectedRevenue * this.FURSAT_COMMISSION;
    const netProfit = expectedRevenue - annualOperatingCost - fursatCommission;

    // Calculate 20-year projections with dynamic price
    const projections = this.calculateProjections(plants, setupCost, annualOperatingCost, pricePerKg);
    const fiveYearProfit = projections.slice(0, 5).reduce((sum, year) => sum + year.netProfit, 0);
    const tenYearProfit = projections.slice(0, 10).reduce((sum, year) => sum + year.netProfit, 0);
    const twentyYearProfit = projections.reduce((sum, year) => sum + year.netProfit, 0);
    
    // Calculate payback period
    const paybackPeriod = this.calculatePaybackPeriod(setupCost, projections);
    
    // Calculate IRR (simplified)
    const irr = this.calculateIRR(setupCost, projections);

    return {
      acres,
      plants,
      totalCost: setupCost,
      setupCost,
      annualOperatingCost,
      expectedYield: matureYield,
      expectedRevenue,
      netProfit,
      roiYears: setupCost / netProfit,
      paybackPeriod,
      fiveYearProfit,
      tenYearProfit,
      twentyYearProfit,
      irr,
      breakdownCosts,
      projections,
    };
  }

  private static calculateProjections(
    plants: number, 
    setupCost: number, 
    annualOperatingCost: number,
    pricePerKg: number = this.AVERAGE_PRICE_PER_KG
  ): Array<{ year: number; yield: number; revenue: number; operatingCost: number; fursatCommission: number; netProfit: number; cumulativeCashFlow: number; }> {
    const projections = [];
    let cumulativeProfit = -setupCost; // Start with negative setup cost

    for (let year = 1; year <= 20; year++) {
      const yieldPerPlant = this.PRODUCTION_PATTERN[year] || this.PRODUCTION_PATTERN[this.PRODUCTION_PATTERN.length - 1];
      const totalYield = plants * yieldPerPlant;
      const revenue = totalYield * pricePerKg;
      const fursatCommission = revenue * this.FURSAT_COMMISSION;
      const netProfit = revenue - annualOperatingCost - fursatCommission;
      
      cumulativeProfit += netProfit;

      projections.push({
        year,
        yield: totalYield,
        revenue,
        operatingCost: annualOperatingCost,
        fursatCommission,
        netProfit,
        cumulativeCashFlow: cumulativeProfit,
      });
    }

    return projections;
  }

  private static calculatePaybackPeriod(setupCost: number, projections: Array<{ netProfit: number }>): number {
    let cumulativeFlow = -setupCost;
    
    for (let i = 0; i < projections.length; i++) {
      cumulativeFlow += projections[i].netProfit;
      
      if (cumulativeFlow >= 0) {
        // Calculate fractional year
        const previousFlow = cumulativeFlow - projections[i].netProfit;
        const fractionOfYear = (0 - previousFlow) / projections[i].netProfit;
        return (i + 1) + fractionOfYear - 1; // Adjust for 0-based index
      }
    }
    
    return projections.length + 1; // Beyond projection period
  }

  private static calculateIRR(setupCost: number, projections: Array<{ netProfit: number }>): number {
    // Simplified IRR calculation using approximation
    const totalReturn = projections.reduce((sum, year) => sum + year.netProfit, 0);
    const avgAnnualReturn = totalReturn / projections.length;
    const irr = (avgAnnualReturn / setupCost) * 100;
    
    return Math.round(irr);
  }

  static calculateSubsidyBenefit(baseCalculation: InvestmentCalculation): {
    polyhouseSubsidy: number;
    irrigationSubsidy: number;
    totalSubsidy: number;
    netInvestment: number;
    improvedROI: number;
  } {
    const polyhouseSubsidy = Math.min(baseCalculation.breakdownCosts.polyhouse * 0.5, 5600000); // 50% max 56 lakhs
    const irrigationSubsidy = baseCalculation.breakdownCosts.irrigation * 0.45; // 45%
    const totalSubsidy = polyhouseSubsidy + irrigationSubsidy;
    const netInvestment = baseCalculation.totalCost - totalSubsidy;
    const improvedROI = netInvestment / baseCalculation.netProfit;

    return {
      polyhouseSubsidy,
      irrigationSubsidy,
      totalSubsidy,
      netInvestment,
      improvedROI,
    };
  }

  static compareWithTeaEstate(acres: number, pricePerKg: number = this.AVERAGE_PRICE_PER_KG): {
    blueberry: InvestmentCalculation;
    teaEstate: {
      investment: number;
      annualRevenue: number;
      annualProfit: number;
      roiYears: number;
    };
    comparison: {
      investmentRatio: number;
      revenueRatio: number;
      profitRatio: number;
      roiImprovement: number;
    };
  } {
    const blueberry = this.calculate(acres, pricePerKg);
    
    // Tea estate typical figures
    const teaEstate = {
      investment: acres * 250000, // ₹2.5 lakhs per acre
      annualRevenue: acres * 350000, // ₹3.5 lakhs per acre
      annualProfit: acres * 125000, // ₹1.25 lakhs per acre
      roiYears: 2.0,
    };

    const comparison = {
      investmentRatio: blueberry.totalCost / teaEstate.investment,
      revenueRatio: blueberry.expectedRevenue / teaEstate.annualRevenue,
      profitRatio: blueberry.netProfit / teaEstate.annualProfit,
      roiImprovement: teaEstate.roiYears / blueberry.roiYears,
    };

    return { blueberry, teaEstate, comparison };
  }

  static getScaleRecommendation(acres: number): {
    recommended: boolean;
    reason: string;
    alternatives?: string[];
  } {
    if (acres < 1) {
      return {
        recommended: false,
        reason: 'Minimum 1 acre required for commercial viability',
        alternatives: [
          'Partner with neighbors to reach minimum 1 acre scale',
          'Consider leasing additional land to reach minimum size',
          'Start with 1 acre for optimal returns',
        ],
      };
    }

    if (acres >= 1 && acres <= 2) {
      return {
        recommended: true,
        reason: 'Ideal size for beginners with manageable investment',
      };
    }

    if (acres > 2 && acres <= 5) {
      return {
        recommended: true,
        reason: 'Excellent scale for commercial operations',
      };
    }

    if (acres > 5 && acres <= 20) {
      return {
        recommended: true,
        reason: 'Large scale commercial operation - ideal for serious investors',
      };
    }

    if (acres > 20 && acres <= 50) {
      return {
        recommended: true,
        reason: 'Enterprise scale - consider phased implementation',
        alternatives: [
          'Implement in 3-4 phases over 2 years',
          'Consider dedicated management team',
          'Explore contract farming arrangements',
        ],
      };
    }

    return {
      recommended: true,
      reason: 'Mega project scale - requires strategic planning',
      alternatives: [
        'Develop as multiple 20-25 acre units',
        'Consider establishing processing facility',
        'Explore export opportunities',
        'Implement advanced automation',
      ],
    };
  }

  static calculateLoanEligibility(investment: number, annualIncome: number): {
    eligible: boolean;
    maxLoan: number;
    emi: number;
    tenure: number;
    interestRate: number;
  } {
    const interestRate = 0.085; // 8.5% for agricultural loans
    const maxLoanPercentage = 0.8; // 80% of project cost
    const maxLoan = Math.min(investment * maxLoanPercentage, annualIncome * 10);
    const tenure = 7; // 7 years
    
    // EMI calculation
    const monthlyRate = interestRate / 12;
    const months = tenure * 12;
    const emi = (maxLoan * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    return {
      eligible: maxLoan >= investment * 0.5, // At least 50% loan required
      maxLoan: Math.round(maxLoan),
      emi: Math.round(emi),
      tenure,
      interestRate: interestRate * 100,
    };
  }
}