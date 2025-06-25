import { InvestmentCalculator } from './lib/investment-calculator';

// Test calculations for 1 acre
console.log('=== ROI Calculator Test for 1 Acre ===\n');

const result = InvestmentCalculator.calculate(1, 800);

console.log('Investment Details:');
console.log(`- Total Plants: ${result.plants.toLocaleString('en-IN')}`);
console.log(`- Total Investment: ₹${result.totalCost.toLocaleString('en-IN')}`);
console.log(`- Cost per Plant: ₹${(result.totalCost / result.plants).toLocaleString('en-IN')}`);

console.log('\nProduction & Revenue (Year 4+):');
console.log(`- Annual Yield: ${result.expectedYield.toLocaleString('en-IN')} kg`);
console.log(`- Annual Revenue: ₹${result.expectedRevenue.toLocaleString('en-IN')}`);
console.log(`- Annual Operating Cost: ₹${result.annualOperatingCost.toLocaleString('en-IN')}`);
console.log(`- Fursat Commission (10%): ₹${(result.expectedRevenue * 0.1).toLocaleString('en-IN')}`);
console.log(`- Annual Net Profit: ₹${result.netProfit.toLocaleString('en-IN')}`);

console.log('\nROI Metrics:');
console.log(`- Payback Period: ${result.paybackPeriod.toFixed(1)} years`);
console.log(`- 5-Year Total Profit: ₹${result.fiveYearProfit.toLocaleString('en-IN')}`);
console.log(`- 10-Year Total Profit: ₹${result.tenYearProfit.toLocaleString('en-IN')}`);
console.log(`- 15-Year Total Profit: ₹${result.projections.slice(0, 15).reduce((sum, year) => sum + year.netProfit, 0).toLocaleString('en-IN')}`);
console.log(`- 20-Year Total Profit: ₹${result.twentyYearProfit.toLocaleString('en-IN')}`);

// Calculate actual ROI percentages
const roi15Years = ((result.projections.slice(0, 15).reduce((sum, year) => sum + year.netProfit, 0) / result.totalCost) * 100).toFixed(0);
const roi20Years = ((result.twentyYearProfit / result.totalCost) * 100).toFixed(0);

console.log(`\nROI Percentage:`);
console.log(`- 15-Year ROI: ${roi15Years}%`);
console.log(`- 20-Year ROI: ${roi20Years}%`);

// Show year-by-year breakdown for first 5 years
console.log('\n=== Year-by-Year Breakdown ===');
result.projections.slice(0, 5).forEach(year => {
  console.log(`\nYear ${year.year}:`);
  console.log(`- Yield: ${year.yield.toLocaleString('en-IN')} kg`);
  console.log(`- Revenue: ₹${year.revenue.toLocaleString('en-IN')}`);
  console.log(`- Net Profit: ₹${year.netProfit.toLocaleString('en-IN')}`);
  console.log(`- Cumulative Cash Flow: ₹${year.cumulativeCashFlow.toLocaleString('en-IN')}`);
});