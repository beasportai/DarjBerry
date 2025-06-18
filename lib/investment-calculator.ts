export interface InvestmentCalculation {
  acres: number;
  plants: number;
  totalCost: number;
  setupCost: number;
  annualOperatingCost: number;
  expectedYield: number; // kg per year from year 2
  expectedRevenue: number; // annual revenue from year 2
  netProfit: number; // annual profit from year 2
  roiYears: number;
  paybackPeriod: number;
  fiveYearProfit: number;
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

  private static readonly PLANTS_PER_ACRE = 400;
  private static readonly ANNUAL_OPERATING_COST_PER_100_PLANTS = 144000; // ₹1.44 lakhs
  private static readonly FURSAT_COMMISSION = 0.15; // 15%
  private static readonly AVERAGE_PRICE_PER_KG = 900; // ₹900/kg
  
  // Production pattern (kg per plant per year)
  private static readonly PRODUCTION_PATTERN = [0, 3, 4, 4, 4, 4]; // Year 0-5

  static calculate(acres: number): InvestmentCalculation {
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

    // Calculate production and revenue
    const matureYield = plants * this.PRODUCTION_PATTERN[2]; // kg per year from year 2
    const expectedRevenue = matureYield * this.AVERAGE_PRICE_PER_KG;
    const fursatCommission = expectedRevenue * this.FURSAT_COMMISSION;
    const netProfit = expectedRevenue - annualOperatingCost - fursatCommission;

    // Calculate 5-year projections
    const projections = this.calculateProjections(plants, setupCost, annualOperatingCost);
    const fiveYearProfit = projections.reduce((sum, year) => sum + year.netProfit, 0);
    
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
      irr,
      breakdownCosts,
      projections,
    };
  }

  private static calculateProjections(
    plants: number, 
    setupCost: number, 
    annualOperatingCost: number
  ): Array<{ year: number; yield: number; revenue: number; operatingCost: number; fursatCommission: number; netProfit: number; cumulativeCashFlow: number; }> {
    const projections = [];
    let cumulativeProfit = -setupCost; // Start with negative setup cost

    for (let year = 1; year <= 5; year++) {
      const yieldPerPlant = this.PRODUCTION_PATTERN[year] || this.PRODUCTION_PATTERN[this.PRODUCTION_PATTERN.length - 1];
      const totalYield = plants * yieldPerPlant;
      const revenue = totalYield * this.AVERAGE_PRICE_PER_KG;
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

  static compareWithTeaEstate(acres: number): {
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
    const blueberry = this.calculate(acres);
    
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
    if (acres < 0.25) {
      return {
        recommended: false,
        reason: 'Minimum viable size is 0.25 acres (100 plants)',
        alternatives: [
          'Partner with neighbors to reach minimum scale',
          'Consider container farming with 50 plants',
          'Explore other high-value crops',
        ],
      };
    }

    if (acres >= 0.25 && acres <= 1) {
      return {
        recommended: true,
        reason: 'Ideal size for beginners with manageable investment',
      };
    }

    if (acres > 1 && acres <= 5) {
      return {
        recommended: true,
        reason: 'Excellent scale for commercial operations',
      };
    }

    return {
      recommended: true,
      reason: 'Large scale operation - consider phased implementation',
      alternatives: [
        'Start with 2-3 acres and expand based on success',
        'Implement in phases over 2-3 years',
        'Consider multiple varieties for risk mitigation',
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