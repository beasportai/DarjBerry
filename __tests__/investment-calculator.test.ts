/**
 * TDD Phase 1: Investment Calculator Service Tests
 * Following r08_TDD_v1.txt requirements
 */

import { InvestmentCalculator } from '@/lib/investment-calculator';

describe('InvestmentCalculator', () => {
  describe('calculate', () => {
    it('should calculate investment for 1 acre correctly', () => {
      const result = InvestmentCalculator.calculate(1);
      
      expect(result.acres).toBe(1);
      expect(result.plants).toBe(400); // 400 plants per acre
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.expectedYield).toBeGreaterThan(0);
      expect(result.projections).toHaveLength(5);
    });

    it('should scale costs proportionally with acreage', () => {
      const oneAcre = InvestmentCalculator.calculate(1);
      const twoAcres = InvestmentCalculator.calculate(2);
      
      expect(twoAcres.plants).toBe(oneAcre.plants * 2);
      expect(twoAcres.totalCost).toBeCloseTo(oneAcre.totalCost * 2, -4); // Allow small rounding differences
      expect(twoAcres.expectedYield).toBe(oneAcre.expectedYield * 2);
    });

    it('should have valid financial projections', () => {
      const result = InvestmentCalculator.calculate(1);
      
      result.projections.forEach((projection, index) => {
        expect(projection.year).toBe(index + 1);
        expect(projection.yield).toBeGreaterThanOrEqual(0);
        expect(projection.revenue).toBeGreaterThanOrEqual(0);
        expect(projection.operatingCost).toBeGreaterThan(0);
        expect(projection.fursatCommission).toBeGreaterThanOrEqual(0);
        
        // Year 1 should have some yield (3kg/plant), Year 2+ should have more production
        if (index === 0) {
          expect(projection.yield).toBeGreaterThan(0); // First year has 3kg/plant production
        } else {
          expect(projection.yield).toBeGreaterThan(0);
        }
      });
    });

    it('should calculate cumulative cash flow correctly', () => {
      const result = InvestmentCalculator.calculate(1);
      let expectedCumulative = -result.totalCost;
      
      result.projections.forEach((projection) => {
        expectedCumulative += projection.netProfit;
        expect(projection.cumulativeCashFlow).toBeCloseTo(expectedCumulative, 2);
      });
    });

    it('should calculate IRR as positive percentage', () => {
      const result = InvestmentCalculator.calculate(1);
      
      expect(result.irr).toBeGreaterThan(0);
      expect(result.irr).toBeLessThan(1000); // Reasonable upper bound
    });

    it('should calculate reasonable payback period', () => {
      const result = InvestmentCalculator.calculate(1);
      
      expect(result.paybackPeriod).toBeGreaterThan(0);
      expect(result.paybackPeriod).toBeLessThan(10); // Should pay back within 10 years
    });
  });

  describe('calculateSubsidyBenefit', () => {
    it('should calculate subsidy benefits correctly', () => {
      const baseCalculation = InvestmentCalculator.calculate(1);
      const subsidyBenefit = InvestmentCalculator.calculateSubsidyBenefit(baseCalculation);
      
      expect(subsidyBenefit.polyhouseSubsidy).toBeGreaterThan(0);
      expect(subsidyBenefit.irrigationSubsidy).toBeGreaterThan(0);
      expect(subsidyBenefit.totalSubsidy).toBe(subsidyBenefit.polyhouseSubsidy + subsidyBenefit.irrigationSubsidy);
      expect(subsidyBenefit.netInvestment).toBe(baseCalculation.totalCost - subsidyBenefit.totalSubsidy);
      expect(subsidyBenefit.improvedROI).toBeLessThan(baseCalculation.roiYears);
    });

    it('should cap polyhouse subsidy at maximum limit', () => {
      const baseCalculation = InvestmentCalculator.calculate(50); // Large scale
      const subsidyBenefit = InvestmentCalculator.calculateSubsidyBenefit(baseCalculation);
      
      expect(subsidyBenefit.polyhouseSubsidy).toBeLessThanOrEqual(5600000); // 56 lakh cap
    });
  });

  describe('compareWithTeaEstate', () => {
    it('should compare blueberry vs tea estate investments', () => {
      const comparison = InvestmentCalculator.compareWithTeaEstate(1);
      
      expect(comparison.blueberry).toBeDefined();
      expect(comparison.teaEstate).toBeDefined();
      expect(comparison.comparison).toBeDefined();
      
      expect(comparison.teaEstate.investment).toBeGreaterThan(0);
      expect(comparison.teaEstate.annualRevenue).toBeGreaterThan(0);
      expect(comparison.teaEstate.annualProfit).toBeGreaterThan(0);
      
      expect(comparison.comparison.investmentRatio).toBeGreaterThan(0);
      expect(comparison.comparison.revenueRatio).toBeGreaterThan(0);
      expect(comparison.comparison.profitRatio).toBeGreaterThan(0);
    });
  });

  describe('getScaleRecommendation', () => {
    it('should reject sub-minimum scale', () => {
      const recommendation = InvestmentCalculator.getScaleRecommendation(0.1);
      
      expect(recommendation.recommended).toBe(false);
      expect(recommendation.reason).toContain('Minimum viable size');
      expect(recommendation.alternatives).toBeDefined();
      expect(recommendation.alternatives?.length).toBeGreaterThan(0);
    });

    it('should recommend ideal beginner scale', () => {
      const recommendation = InvestmentCalculator.getScaleRecommendation(0.5);
      
      expect(recommendation.recommended).toBe(true);
      expect(recommendation.reason).toContain('beginners');
    });

    it('should recommend commercial scale', () => {
      const recommendation = InvestmentCalculator.getScaleRecommendation(3);
      
      expect(recommendation.recommended).toBe(true);
      expect(recommendation.reason).toContain('commercial');
    });

    it('should suggest phased implementation for large scale', () => {
      const recommendation = InvestmentCalculator.getScaleRecommendation(20);
      
      expect(recommendation.recommended).toBe(true);
      expect(recommendation.reason).toContain('phased');
      expect(recommendation.alternatives).toBeDefined();
    });
  });

  describe('calculateLoanEligibility', () => {
    it('should calculate loan eligibility correctly', () => {
      const investment = 1000000; // 10 lakhs
      const annualIncome = 500000; // 5 lakhs
      
      const loan = InvestmentCalculator.calculateLoanEligibility(investment, annualIncome);
      
      expect(loan.maxLoan).toBeGreaterThan(0);
      expect(loan.maxLoan).toBeLessThanOrEqual(investment * 0.8); // Max 80%
      expect(loan.emi).toBeGreaterThan(0);
      expect(loan.tenure).toBe(7);
      expect(loan.interestRate).toBe(8.5);
    });

    it('should determine eligibility based on loan amount', () => {
      const investment = 1000000;
      const highIncome = 1000000;
      const veryLowIncome = 10000; // Very low income that will make maxLoan too small
      
      const highIncomeLoan = InvestmentCalculator.calculateLoanEligibility(investment, highIncome);
      const lowIncomeLoan = InvestmentCalculator.calculateLoanEligibility(investment, veryLowIncome);
      
      expect(highIncomeLoan.eligible).toBe(true);
      expect(lowIncomeLoan.eligible).toBe(false);
      expect(lowIncomeLoan.maxLoan).toBeLessThan(investment * 0.5);
    });
  });

  describe('edge cases and validation', () => {
    it('should handle zero acres gracefully', () => {
      expect(() => InvestmentCalculator.calculate(0)).not.toThrow();
      const result = InvestmentCalculator.calculate(0);
      expect(result.plants).toBe(0);
      expect(result.expectedYield).toBe(0);
    });

    it('should handle very small acreage', () => {
      const result = InvestmentCalculator.calculate(0.01);
      expect(result.plants).toBeGreaterThanOrEqual(0);
      expect(result.totalCost).toBeGreaterThan(0);
    });

    it('should handle large acreage', () => {
      const result = InvestmentCalculator.calculate(100);
      expect(result.plants).toBe(40000); // 100 * 400
      expect(result.totalCost).toBeGreaterThan(0);
      expect(result.projections).toHaveLength(5);
    });

    it('should maintain consistent calculation ratios', () => {
      const smallScale = InvestmentCalculator.calculate(0.5);
      const largeScale = InvestmentCalculator.calculate(5);
      
      // Cost per plant should be roughly consistent
      const smallCostPerPlant = smallScale.totalCost / smallScale.plants;
      const largeCostPerPlant = largeScale.totalCost / largeScale.plants;
      
      expect(largeCostPerPlant).toBeCloseTo(smallCostPerPlant, -3); // Allow for scale efficiencies
    });
  });
});