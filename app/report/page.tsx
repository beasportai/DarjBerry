"use Client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

const BlueberryFarmAnalysis = () => {
  // Constants for all scenarios
  const LAND_AREA_ACRES = 10;
  const PLANT_POPULATION = 30000;
  const YEARLY_OPERATION_COST_AFTER_Y1 = 8600000; // 86 lakhs
  const POLYHOUSE_SETUP_COST_PER_ACRE = 7000000; // 70 lakhs per acre
  const TOTAL_POLYHOUSE_SETUP_COST = POLYHOUSE_SETUP_COST_PER_ACRE * LAND_AREA_ACRES; // 7 crore
  
  // Pricing assumptions
  const EXPORT_PERCENTAGE = 0.5;
  const DOMESTIC_PERCENTAGE = 0.5;
  const EXPORT_PRICE = 440; // Rs per kg
  const DOMESTIC_PRICE = 1000; // Rs per kg
  const DAMAGE_RETURNS_PERCENTAGE = 0.1;
  
  // Convert dollar values to rupees (assuming 1 USD = 75 INR)
  const USD_TO_INR = 75;
  
  // Different plant costs for each scenario
  const SCENARIO_1_PLANT_COST = 500; // Rs per plant
  const SCENARIO_2_PLANT_COST = 900 + (10 * USD_TO_INR); // Rs per plant (900 + 10$ transportation)
  const SCENARIO_3_PLANT_COST = (15 * USD_TO_INR) + (10 * USD_TO_INR); // Rs per plant (15$ + 10$ transportation)
  
  // Calculate effective sales price
  const calculateEffectiveSalesPrice = () => {
    const weightedPrice = (EXPORT_PRICE * EXPORT_PERCENTAGE) + (DOMESTIC_PRICE * DOMESTIC_PERCENTAGE);
    return weightedPrice * (1 - DAMAGE_RETURNS_PERCENTAGE);
  };
  
  const EFFECTIVE_SALES_PRICE = calculateEffectiveSalesPrice();
  
  // Production patterns per plant across years (in kg)
  const SCENARIO_1_PRODUCTION = [0.75, 2.00, 4.00, 4.00, 4.00];
  const SCENARIO_2_PRODUCTION = [2.00, 3.00, 4.00, 4.00, 4.00];
  const SCENARIO_3_PRODUCTION = [3.00, 4.00, 4.00, 4.00, 4.00];
  
  // Calculate financials for all scenarios
  const calculateFinancials = (scenarioName, plantCost, productionPattern) => {
    const initialPlantCost = plantCost * PLANT_POPULATION;
    const firstYearOperationCost = 23600000; // 2.36 crore (from tables)
    
    // Calculate total initial investment
    const totalInitialInvestment = TOTAL_POLYHOUSE_SETUP_COST + initialPlantCost + firstYearOperationCost;
    
    // Calculate yearly cash flows
    const yearlyData = [];
    let cumulativeCashFlow = -totalInitialInvestment;
    let recoveryYear = null;
    
    // Project for 10 years
    for (let year = 1; year <= 10; year++) {
      // Get production per plant (use last value for years beyond the pattern)
      const productionPerPlant = year <= productionPattern.length 
        ? productionPattern[year-1] 
        : productionPattern[productionPattern.length-1];
      
      // Calculate total production
      const totalProduction = productionPerPlant * PLANT_POPULATION;
      
      // Calculate revenue
      const revenue = totalProduction * EFFECTIVE_SALES_PRICE;
      
      // Determine operation cost (first year from input, subsequent years use yearly operation cost)
      const operationCost = year === 1 ? firstYearOperationCost : YEARLY_OPERATION_COST_AFTER_Y1;
      
      // Calculate net profit
      const netProfit = revenue - operationCost;
      
      // Update cumulative cash flow
      cumulativeCashFlow += netProfit;
      
      // Check if this is the recovery year (first year where cumulative cash flow becomes positive)
      if (cumulativeCashFlow >= 0 && recoveryYear === null) {
        // Calculate the fractional year for exact recovery point
        const previousYearCumulativeFlow = year > 1 ? yearlyData[year-2].cumulativeCashFlow : -totalInitialInvestment;
        const fractionOfYear = (0 - previousYearCumulativeFlow) / netProfit;
        recoveryYear = year - 1 + fractionOfYear;
      }
      
      yearlyData.push({
        year,
        productionPerPlant,
        totalProduction,
        revenue,
        operationCost,
        netProfit,
        cumulativeCashFlow
      });
    }
    
    return {
      scenarioName,
      totalInitialInvestment,
      initialPlantCost,
      yearlyData,
      recoveryYear: recoveryYear !== null ? recoveryYear : ">10 years"
    };
  };
  
  // Calculate all three scenarios
  const scenario1 = calculateFinancials("Scenario 1 (₹500/plant)", SCENARIO_1_PLANT_COST, SCENARIO_1_PRODUCTION);
  const scenario2 = calculateFinancials("Scenario 2 (₹900 + $10/plant)", SCENARIO_2_PLANT_COST, SCENARIO_2_PRODUCTION);
  const scenario3 = calculateFinancials("Scenario 3 ($15 + $10/plant)", SCENARIO_3_PLANT_COST, SCENARIO_3_PRODUCTION);
  
  // Format to crores with 2 decimal places
  const formatToCrores = (value) => {
    return (value / 10000000).toFixed(2);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return `₹${formatToCrores(value)} Cr`;
  };
  
  // Prepare data for charts
  const productionData = [];
  const revenueData = [];
  const profitData = [];
  const cumulativeCashFlowData = [];
  
  // Add initial investment point (Year 0)
  cumulativeCashFlowData.push({
    year: 0,
    "Scenario 1": -scenario1.totalInitialInvestment,
    "Scenario 2": -scenario2.totalInitialInvestment,
    "Scenario 3": -scenario3.totalInitialInvestment
  });
  
  // Prepare data for year-by-year comparison
  for (let year = 1; year <= 5; year++) {
    // Production data
    productionData.push({
      year: `Year ${year}`,
      "Scenario 1": scenario1.yearlyData[year-1].totalProduction,
      "Scenario 2": scenario2.yearlyData[year-1].totalProduction,
      "Scenario 3": scenario3.yearlyData[year-1].totalProduction
    });
    
    // Revenue data
    revenueData.push({
      year: `Year ${year}`,
      "Scenario 1": scenario1.yearlyData[year-1].revenue,
      "Scenario 2": scenario2.yearlyData[year-1].revenue,
      "Scenario 3": scenario3.yearlyData[year-1].revenue
    });
    
    // Profit data
    profitData.push({
      year: `Year ${year}`,
      "Scenario 1": scenario1.yearlyData[year-1].netProfit,
      "Scenario 2": scenario2.yearlyData[year-1].netProfit,
      "Scenario 3": scenario3.yearlyData[year-1].netProfit
    });
    
    // Cumulative cash flow
    cumulativeCashFlowData.push({
      year: year,
      "Scenario 1": scenario1.yearlyData[year-1].cumulativeCashFlow,
      "Scenario 2": scenario2.yearlyData[year-1].cumulativeCashFlow,
      "Scenario 3": scenario3.yearlyData[year-1].cumulativeCashFlow
    });
  }
  
  // Prepare ROI comparison data
  const roiData = [
    { name: "Scenario 1", initialInvestment: scenario1.totalInitialInvestment, recoveryYear: scenario1.recoveryYear },
    { name: "Scenario 2", initialInvestment: scenario2.totalInitialInvestment, recoveryYear: scenario2.recoveryYear },
    { name: "Scenario 3", initialInvestment: scenario3.totalInitialInvestment, recoveryYear: scenario3.recoveryYear }
  ];

  // Prepare cost breakdown data for each scenario
  const costBreakdownData = [
    { 
      name: "Scenario 1", 
      "Polyhouse Setup": TOTAL_POLYHOUSE_SETUP_COST, 
      "Plants": scenario1.initialPlantCost, 
      "First Year Operations": 23600000 
    },
    { 
      name: "Scenario 2", 
      "Polyhouse Setup": TOTAL_POLYHOUSE_SETUP_COST, 
      "Plants": scenario2.initialPlantCost, 
      "First Year Operations": 23600000 
    },
    { 
      name: "Scenario 3", 
      "Polyhouse Setup": TOTAL_POLYHOUSE_SETUP_COST, 
      "Plants": scenario3.initialPlantCost, 
      "First Year Operations": 23600000 
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Blueberry Farm Investment Analysis</h1>
        <p className="text-muted-foreground mt-2">
          Comparing three investment scenarios with different plant costs and production patterns.
        </p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="production">Production & Revenue</TabsTrigger>
          <TabsTrigger value="cashflow">Cash Flow & ROI</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[scenario1, scenario2, scenario3].map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {scenario.scenarioName}
                      <Badge variant={index === 2 ? "default" : index === 1 ? "secondary" : "outline"}>
                        {typeof scenario.recoveryYear === 'number' ? scenario.recoveryYear.toFixed(2) : scenario.recoveryYear} years
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Recovery period analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Initial Investment</span>
                        <span className="font-medium">{formatCurrency(scenario.totalInitialInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Plant Cost</span>
                        <span className="font-medium">{formatCurrency(scenario.initialPlantCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Year 5 Cash Position</span>
                        <span className="font-medium">{formatCurrency(scenario.yearlyData[4].cumulativeCashFlow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">5-Year ROI</span>
                        <span className="font-medium">{((scenario.yearlyData[4].cumulativeCashFlow / scenario.totalInitialInvestment) * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Investment Recovery Comparison</CardTitle>
                <CardDescription>
                  Comparing initial investment vs. years to recover
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roiData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" label={{ value: 'Years to Recover', angle: -90, position: 'insideLeft' }} />
                      <YAxis yAxisId="right" orientation="right" label={{ value: 'Initial Investment (₹ Cr)', angle: 90, position: 'insideRight' }} />
                      <Tooltip formatter={(value, name) => {
                        if (name === "recoveryYear") return [typeof value === 'number' ? value.toFixed(2) + " years" : value, "Recovery Period"];
                        if (name === "initialInvestment") return ["₹" + formatToCrores(value) + " Cr", "Initial Investment"];
                        return [value, name];
                      }}/>
                      <Legend />
                      <Bar yAxisId="left" dataKey="recoveryYear" fill="#8884d8" name="Recovery Period (Years)" />
                      <Bar yAxisId="right" dataKey="initialInvestment" fill="#82ca9d" name="Initial Investment (₹)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Scenario Comparison</CardTitle>
                <CardDescription>
                  Key parameters for all scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Scenario 1</TableHead>
                      <TableHead>Scenario 2</TableHead>
                      <TableHead>Scenario 3</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Plant Cost</TableCell>
                      <TableCell>₹500 per plant</TableCell>
                      <TableCell>₹900 + $10 (₹1,650) per plant</TableCell>
                      <TableCell>$15 + $10 (₹1,875) per plant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">First Year Production</TableCell>
                      <TableCell>0.75 kg/plant</TableCell>
                      <TableCell>2.00 kg/plant</TableCell>
                      <TableCell>3.00 kg/plant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Second Year Production</TableCell>
                      <TableCell>2.00 kg/plant</TableCell>
                      <TableCell>3.00 kg/plant</TableCell>
                      <TableCell>4.00 kg/plant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Annual Production (Y3+)</TableCell>
                      <TableCell>4.00 kg/plant</TableCell>
                      <TableCell>4.00 kg/plant</TableCell>
                      <TableCell>4.00 kg/plant</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total Initial Investment</TableCell>
                      <TableCell>₹{formatToCrores(scenario1.totalInitialInvestment)} Cr</TableCell>
                      <TableCell>₹{formatToCrores(scenario2.totalInitialInvestment)} Cr</TableCell>
                      <TableCell>₹{formatToCrores(scenario3.totalInitialInvestment)} Cr</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Recovery Period</TableCell>
                      <TableCell className="font-medium">{typeof scenario1.recoveryYear === 'number' ? scenario1.recoveryYear.toFixed(2) : scenario1.recoveryYear} years</TableCell>
                      <TableCell className="font-medium">{typeof scenario2.recoveryYear === 'number' ? scenario2.recoveryYear.toFixed(2) : scenario2.recoveryYear} years</TableCell>
                      <TableCell className="font-medium">{typeof scenario3.recoveryYear === 'number' ? scenario3.recoveryYear.toFixed(2) : scenario3.recoveryYear} years</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Production & Revenue Tab */}
        <TabsContent value="production">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Annual Production (kg)</CardTitle>
                <CardDescription>
                  Comparing production volumes across scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Production (kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => [value.toLocaleString(), "kg"]} />
                      <Legend />
                      <Bar dataKey="Scenario 1" fill="#8884d8" />
                      <Bar dataKey="Scenario 2" fill="#82ca9d" />
                      <Bar dataKey="Scenario 3" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Annual Revenue (₹)</CardTitle>
                <CardDescription>
                  Revenue generation across all scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Revenue (₹ Cr)', angle: -90, position: 'insideLeft' }} 
                             tickFormatter={(value) => (value / 10000000).toFixed(1)} />
                      <Tooltip formatter={(value) => ["₹" + formatToCrores(value) + " Cr", "Revenue"]} />
                      <Legend />
                      <Bar dataKey="Scenario 1" fill="#8884d8" />
                      <Bar dataKey="Scenario 2" fill="#82ca9d" />
                      <Bar dataKey="Scenario 3" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Annual Net Profit (₹)</CardTitle>
                <CardDescription>
                  Profit comparison between scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Net Profit (₹ Cr)', angle: -90, position: 'insideLeft' }} 
                             tickFormatter={(value) => (value / 10000000).toFixed(1)} />
                      <Tooltip formatter={(value) => ["₹" + formatToCrores(value) + " Cr", "Net Profit"]} />
                      <Legend />
                      <Bar dataKey="Scenario 1" fill="#8884d8" />
                      <Bar dataKey="Scenario 2" fill="#82ca9d" />
                      <Bar dataKey="Scenario 3" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Production & Revenue Details</CardTitle>
                <CardDescription>
                  Year-by-year production and revenue metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Scenario</TableHead>
                      <TableHead>Production (kg/plant)</TableHead>
                      <TableHead>Total Production (kg)</TableHead>
                      <TableHead>Revenue (₹ Cr)</TableHead>
                      <TableHead>Net Profit (₹ Cr)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].flatMap(year => [
                      {
                        year,
                        scenario: "Scenario 1",
                        production: scenario1.yearlyData[year-1].productionPerPlant,
                        totalProduction: scenario1.yearlyData[year-1].totalProduction,
                        revenue: scenario1.yearlyData[year-1].revenue,
                        profit: scenario1.yearlyData[year-1].netProfit
                      },
                      {
                        year,
                        scenario: "Scenario 2",
                        production: scenario2.yearlyData[year-1].productionPerPlant,
                        totalProduction: scenario2.yearlyData[year-1].totalProduction,
                        revenue: scenario2.yearlyData[year-1].revenue,
                        profit: scenario2.yearlyData[year-1].netProfit
                      },
                      {
                        year,
                        scenario: "Scenario 3",
                        production: scenario3.yearlyData[year-1].productionPerPlant,
                        totalProduction: scenario3.yearlyData[year-1].totalProduction,
                        revenue: scenario3.yearlyData[year-1].revenue,
                        profit: scenario3.yearlyData[year-1].netProfit
                      }
                    ]).map((row, index) => (
                      <TableRow key={index} className={index % 3 === 0 ? 'bg-muted/50' : ''}>
                        {index % 3 === 0 && <TableCell rowSpan="3" className="font-medium">Year {row.year}</TableCell>}
                        <TableCell>{row.scenario}</TableCell>
                        <TableCell>{row.production.toFixed(2)}</TableCell>
                        <TableCell>{row.totalProduction.toLocaleString()}</TableCell>
                        <TableCell>₹{formatToCrores(row.revenue)}</TableCell>
                        <TableCell>₹{formatToCrores(row.profit)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Cash Flow & ROI Tab */}
        <TabsContent value="cashflow">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cumulative Cash Flow</CardTitle>
                <CardDescription>
                  Cash flow progression and break-even points
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={cumulativeCashFlowData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis label={{ value: 'Cumulative Cash Flow (₹ Cr)', angle: -90, position: 'insideLeft' }} 
                             tickFormatter={(value) => (value / 10000000).toFixed(1)} />
                      <Tooltip formatter={(value) => ["₹" + formatToCrores(value) + " Cr", "Cash Flow"]} />
                      <Legend />
                      <ReferenceLine y={0} stroke="red" strokeDasharray="3 3">
                        <Label value="Break-even Point" position="insideBottomRight" />
                      </ReferenceLine>
                      <Line type="monotone" dataKey="Scenario 1" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Scenario 2" stroke="#82ca9d" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Scenario 3" stroke="#ffc658" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[scenario1, scenario2, scenario3].map((scenario, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{scenario.scenarioName}</CardTitle>
                    <CardDescription>Cash flow metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Investment Recovery</span>
                        <span className="font-medium">{typeof scenario.recoveryYear === 'number' ? scenario.recoveryYear.toFixed(2) : scenario.recoveryYear} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Initial Investment</span>
                        <span className="font-medium">{formatCurrency(scenario.totalInitialInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Year 5 Cash Position</span>
                        <span className="font-medium">{formatCurrency(scenario.yearlyData[4].cumulativeCashFlow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">5-Year ROI</span>
                        <span className="font-medium">{((scenario.yearlyData[4].cumulativeCashFlow / scenario.totalInitialInvestment) * 100).toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Year-by-Year Cash Flow Details</CardTitle>
                <CardDescription>
                  Detailed cash flow and profitability data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Scenario</TableHead>
                      <TableHead>Annual Revenue (₹ Cr)</TableHead>
                      <TableHead>Operation Cost (₹ Cr)</TableHead>
                      <TableHead>Net Profit (₹ Cr)</TableHead>
                      <TableHead>Cumulative Cash Flow (₹ Cr)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-muted/50">
                      <TableCell rowSpan="3" className="font-medium">Year 0</TableCell>
                      <TableCell>Scenario 1</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-red-600">-₹{formatToCrores(scenario1.totalInitialInvestment)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Scenario 2</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-red-600">-₹{formatToCrores(scenario2.totalInitialInvestment)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Scenario 3</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell className="text-red-600">-₹{formatToCrores(scenario3.totalInitialInvestment)}</TableCell>
                    </TableRow>
                    
                    {[1, 2, 3, 4, 5].flatMap(year => [
                      {
                        year,
                        scenario: "Scenario 1",
                        revenue: scenario1.yearlyData[year-1].revenue,
                        operationCost: scenario1.yearlyData[year-1].operationCost,
                        profit: scenario1.yearlyData[year-1].netProfit,
                        cashFlow: scenario1.yearlyData[year-1].cumulativeCashFlow
                      },
                      {
                        year,
                        scenario: "Scenario 2",
                        revenue: scenario2.yearlyData[year-1].revenue,
                        operationCost: scenario2.yearlyData[year-1].operationCost,
                        profit: scenario2.yearlyData[year-1].netProfit,
                        cashFlow: scenario2.yearlyData[year-1].cumulativeCashFlow
                      },
                      {
                        year,
                        scenario: "Scenario 3",
                        revenue: scenario3.yearlyData[year-1].revenue,
                        operationCost: scenario3.yearlyData[year-1].operationCost,
                        profit: scenario3.yearlyData[year-1].netProfit,
                        cashFlow: scenario3.yearlyData[year-1].cumulativeCashFlow
                      }
                    ]).map((row, index) => (
                      <TableRow key={index + 3} className={index % 3 === 0 ? 'bg-muted/50' : ''}>
                        {index % 3 === 0 && <TableCell rowSpan="3" className="font-medium">Year {row.year}</TableCell>}
                        <TableCell>{row.scenario}</TableCell>
                        <TableCell>₹{formatToCrores(row.revenue)}</TableCell>
                        <TableCell>₹{formatToCrores(row.operationCost)}</TableCell>
                        <TableCell>₹{formatToCrores(row.profit)}</TableCell>
                        <TableCell className={row.cashFlow < 0 ? 'text-red-600' : 'text-green-600'}>
                          {row.cashFlow < 0 ? '-' : ''}₹{formatToCrores(Math.abs(row.cashFlow))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Cost Analysis Tab */}
        <TabsContent value="costs">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Initial Investment Breakdown</CardTitle>
                <CardDescription>
                  Cost breakdown for each scenario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={costBreakdownData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" 
                             label={{ value: 'Cost (₹ Cr)', position: 'insideBottom', offset: -5 }}
                             tickFormatter={(value) => (value / 10000000).toFixed(1)} />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip formatter={(value) => ["₹" + formatToCrores(value) + " Cr", "Cost"]} />
                      <Legend />
                      <Bar dataKey="Polyhouse Setup" stackId="a" fill="#8884d8" />
                      <Bar dataKey="Plants" stackId="a" fill="#82ca9d" />
                      <Bar dataKey="First Year Operations" stackId="a" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Initial Cost Distribution</CardTitle>
                  <CardDescription>
                    Cost breakdown by category for each scenario
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Scenario</TableHead>
                        <TableHead>Polyhouse Setup</TableHead>
                        <TableHead>Plants</TableHead>
                        <TableHead>First Year Operations</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Scenario 1</TableCell>
                        <TableCell>₹{formatToCrores(TOTAL_POLYHOUSE_SETUP_COST)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(scenario1.initialPlantCost)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(23600000)} Cr</TableCell>
                        <TableCell className="font-medium">₹{formatToCrores(scenario1.totalInitialInvestment)} Cr</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Scenario 2</TableCell>
                        <TableCell>₹{formatToCrores(TOTAL_POLYHOUSE_SETUP_COST)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(scenario2.initialPlantCost)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(23600000)} Cr</TableCell>
                        <TableCell className="font-medium">₹{formatToCrores(scenario2.totalInitialInvestment)} Cr</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Scenario 3</TableCell>
                        <TableCell>₹{formatToCrores(TOTAL_POLYHOUSE_SETUP_COST)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(scenario3.initialPlantCost)} Cr</TableCell>
                        <TableCell>₹{formatToCrores(23600000)} Cr</TableCell>
                        <TableCell className="font-medium">₹{formatToCrores(scenario3.totalInitialInvestment)} Cr</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>First Year Operation Cost Breakdown</CardTitle>
                  <CardDescription>
                    Detailed breakdown of operating expenses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cost Component</TableHead>
                        <TableHead>Amount (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Labor Cost</TableCell>
                        <TableCell>₹3,600,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Fertilizer & Pesticides</TableCell>
                        <TableCell>₹4,000,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Electricity (50 KW)</TableCell>
                        <TableCell>₹300,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Packaging & Transport</TableCell>
                        <TableCell>₹500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Maintenance</TableCell>
                        <TableCell>₹200,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Total Operating Cost</TableCell>
                        <TableCell className="font-medium">₹8,600,000</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Assumptions & Constants</CardTitle>
                <CardDescription>
                  Key assumptions used in financial calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-2">Land & Setup</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Land Area: 10 Acres (40,468 sq.m)</li>
                      <li>Plant Population: 30,000 plants</li>
                      <li>Polyhouse Setup Cost: ₹70 Lakh/acre</li>
                      <li>Total Polyhouse Setup: ₹7 Crore</li>
                      <li>First Year Operation Cost: ₹2.36 Crore</li>
                      <li>Yearly Operation Cost (after Y1): ₹86 Lakh</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-2">Revenue & Pricing</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Export Sales: 50% at ₹440/kg</li>
                      <li>Domestic Sales: 50% at ₹1,000/kg</li>
                      <li>Damage/Returns: 10%</li>
                      <li>Effective Sales Price: ₹{EFFECTIVE_SALES_PRICE.toFixed(2)}/kg</li>
                      <li>Annual Harvest Cycle: 365 days</li>
                      <li>Workers: 20</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Alert className="mt-6 bg-slate-50">
        <AlertTitle>Analysis Notes</AlertTitle>
        <AlertDescription>
          All calculations are based on the provided data and assumptions. The recovery period is calculated as the time taken for cumulative cash flow to become positive. While Scenario 3 has the highest initial investment, it offers the fastest recovery period due to higher early production.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default BlueberryFarmAnalysis;
