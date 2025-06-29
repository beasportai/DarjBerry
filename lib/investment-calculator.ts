export interface InvestmentCalculation {
  acres: number;
  plants: number;
  coverage: string;
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

import { DARJBERRY_CONSTANTS } from './shared-constants';

export class InvestmentCalculator {
  // Constants from shared constants to ensure consistency
  private static readonly COST_PER_PLANT = DARJBERRY_CONSTANTS.COST_PER_PLANT;
  private static readonly PLANTS_PER_ACRE = DARJBERRY_CONSTANTS.PLANTS_PER_ACRE;
  private static readonly FURSAT_COMMISSION = DARJBERRY_CONSTANTS.FURSAT_COMMISSION;
  private static readonly AVERAGE_PRICE_PER_KG = DARJBERRY_CONSTANTS.DEFAULT_PRICE_PER_KG;
  private static readonly SERVICE_PACKAGE_COST_PER_ACRE = DARJBERRY_CONSTANTS.SERVICE_PACKAGE_COST_PER_ACRE;
  private static readonly MONTHLY_MAINTENANCE_COST = DARJBERRY_CONSTANTS.MONTHLY_MAINTENANCE_COST;
  private static readonly PRODUCTION_PATTERN = DARJBERRY_CONSTANTS.PRODUCTION_PATTERN;

  static calculate(acres: number, pricePerKg: number = this.AVERAGE_PRICE_PER_KG): InvestmentCalculation {
    const plants = Math.round(acres * this.PLANTS_PER_ACRE);
    const coverage = acres < 1 
      ? `${(plants * DARJBERRY_CONSTANTS.SQ_MT_SPACING_PER_PLANT * 10.7639).toFixed(0)} sq. ft.`
      : `${acres.toFixed(2)} acres`;
    
    // Total investment is ₹88,00,000 per acre (scaled proportionally)
    const totalInvestment = this.SERVICE_PACKAGE_COST_PER_ACRE * acres;
    
    // Plant cost portion
    const plantCost = plants * this.COST_PER_PLANT;
    
    // Infrastructure and management cost (included in package)
    const infrastructureAndManagementCost = totalInvestment - plantCost;
    
    // Breakdown costs - simplified based on actual service components
    const breakdownCosts = {
      plants: plantCost, // ₹88,00,000 for 2,200 plants
      polyhouse: acres * 5500000, // ₹55,00,000 per acre for climate-controlled polyhouse
      irrigation: acres * 800000, // Drip irrigation + fogger system
      soilPreparation: acres * 500000, // Land preparation
      labor: acres * 4400000, // 15 years management (₹66,00,000 / 15 years = ₹4,40,000/year)
      transportation: acres * 300000, // Logistics
      consulting: acres * 200000, // Expert consultation
      contingency: acres * 100000, // Buffer
    };

    // Annual operating cost based on monthly maintenance fees, scaled to farm size
    const annualOperatingCost = (this.MONTHLY_MAINTENANCE_COST * 12) * acres;

    // Calculate production and revenue using dynamic price
    const matureYield = plants * this.PRODUCTION_PATTERN[4]; // kg per year from year 4+ (3kg/plant)
    const expectedRevenue = matureYield * pricePerKg;
    const fursatCommission = expectedRevenue * this.FURSAT_COMMISSION;
    const netProfit = expectedRevenue - annualOperatingCost - fursatCommission;

    // Calculate 20-year projections with dynamic price
    const projections = this.calculateProjections(plants, totalInvestment, annualOperatingCost, pricePerKg);
    const fiveYearProfit = projections.slice(0, 5).reduce((sum, year) => sum + year.netProfit, 0);
    const tenYearProfit = projections.slice(0, 10).reduce((sum, year) => sum + year.netProfit, 0);
    const twentyYearProfit = projections.reduce((sum, year) => sum + year.netProfit, 0);
    
    // Calculate payback period
    const paybackPeriod = this.calculatePaybackPeriod(totalInvestment, projections);
    
    // Calculate IRR (simplified)
    const irr = this.calculateIRR(totalInvestment, projections);

    return {
      acres,
      plants,
      coverage,
      totalCost: totalInvestment, // Total package cost
      setupCost: totalInvestment,
      annualOperatingCost,
      expectedYield: matureYield,
      expectedRevenue,
      netProfit,
      roiYears: totalInvestment / netProfit,
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
      const yearlyNetProfit = projections[i].netProfit;
      if (yearlyNetProfit <= 0) continue;

      if (cumulativeFlow + yearlyNetProfit >= 0) {
        const fractionOfYear = -cumulativeFlow / yearlyNetProfit;
        return i + 1 + fractionOfYear - 1; // Return the payback period in years
      }
      cumulativeFlow += yearlyNetProfit;
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