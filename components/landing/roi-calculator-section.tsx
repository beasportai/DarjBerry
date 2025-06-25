"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SectionTitle } from "./section-title";
import {
  InvestmentCalculator,
  InvestmentCalculation,
} from "@/lib/investment-calculator";

interface RoiCalculatorSectionProps {
  plantsPerAcre?: number;
  investmentPerPlant?: number;
  returnPerPlant?: number;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = () => {
  const [acres, setAcres] = useState(1);
  const [pricePerKg, setPricePerKg] = useState(800);
  const [calculation, setCalculation] = useState<InvestmentCalculation | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (acres >= 1) {
      setError("");
      const calc = InvestmentCalculator.calculate(acres, pricePerKg);
      setCalculation(calc);
    } else {
      setError("Minimum 1 acre required for commercial viability");
      setCalculation(null);
    }
  }, [acres, pricePerKg]);

  const handleAcresChange = (value: number) => {
    if (value < 1) {
      setError("Minimum 1 acre required for commercial viability");
    } else {
      setError("");
    }
    setAcres(value);
  };

  // Removed unused fallback calculations - now using InvestmentCalculator for all calculations

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="py-20 bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Calculate Your 15-Year Potential"
          subtitle="Use our dynamic calculator to project your tax-free returns. Each acre supports 2,200 plants. Minimum 1 acre for commercial viability."
        />
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="acres" className="text-lg font-semibold">
                  Your Land Size (in acres)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="acres"
                    min={1}
                    max={100}
                    step={0.5}
                    value={[acres]}
                    onValueChange={(value) => handleAcresChange(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    step={0.5}
                    value={acres}
                    onChange={(e) => handleAcresChange(Number(e.target.value))}
                    className="w-32 bg-white/20 border-white/30 text-center font-bold text-xl"
                  />
                </div>
                {error && (
                  <p className="text-red-300 text-sm mt-2 font-medium">
                    {error}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="price" className="text-lg font-semibold">
                  Blueberry Price (₹ per kg)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="price"
                    min={600}
                    max={1200}
                    step={50}
                    value={[pricePerKg]}
                    onValueChange={(value) => setPricePerKg(value[0])}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    min={600}
                    max={1200}
                    step={50}
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(Number(e.target.value))}
                    className="w-32 bg-white/20 border-white/30 text-center font-bold text-xl"
                  />
                </div>
                <div className="flex justify-between text-sm text-green-200 mt-2">
                  <span>₹600 (Regular)</span>
                  <span>₹800 (Premium)</span>
                  <span>₹1000+ (Export)</span>
                </div>
              </div>

              {calculation ? (
                <>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-sm uppercase tracking-wider text-green-200">
                        Total Plants
                      </p>
                      <p className="text-2xl font-bold">
                        {calculation.plants.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-green-300 mt-1">
                        (2,200 plants/acre)
                      </p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-sm uppercase tracking-wider text-green-200">
                        Initial Investment
                      </p>
                      <p className="text-2xl font-bold">
                        {formatCurrency(calculation.totalCost)}
                      </p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg">
                      <p className="text-sm uppercase tracking-wider text-green-200">
                        Payback Period
                      </p>
                      <p className="text-2xl font-bold">
                        {calculation.paybackPeriod.toFixed(1)} years
                      </p>
                    </div>
                  </div>

                  <div className="bg-white/20 p-6 rounded-lg text-center">
                    <p className="text-lg uppercase tracking-wider text-green-100">
                      Annual Revenue (from Year 4+)
                    </p>
                    <p className="text-4xl font-extrabold mt-2 drop-shadow-lg">
                      {formatCurrency(calculation.expectedRevenue)}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-green-200">
                      Annual Net Profit: {formatCurrency(calculation.netProfit)}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-sm text-green-300">5-Year Total</p>
                        <p className="text-lg font-bold">{formatCurrency(calculation.fiveYearProfit)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-300">10-Year Total</p>
                        <p className="text-lg font-bold">{formatCurrency(calculation.tenYearProfit)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-green-300">20-Year Total</p>
                        <p className="text-lg font-bold">{formatCurrency(calculation.twentyYearProfit)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/15 p-6 rounded-lg mx-auto max-w-2xl">
                    <h4 className="font-semibold text-green-200 mb-4 text-center">
                      20-Year Production Lifecycle
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Year 1 (0.5kg/plant):</span>
                          <span className="font-medium">
                            {(calculation.plants * 0.5).toLocaleString()} kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year 2 (1kg/plant):</span>
                          <span className="font-medium">{calculation.plants.toLocaleString()} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Year 3 (2kg/plant):</span>
                          <span className="font-medium">
                            {(calculation.plants * 2).toLocaleString()} kg
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-green-300/30 pt-2">
                          <span className="font-semibold">Years 4-20 (3kg/plant):</span>
                          <span className="font-bold text-base">
                            {calculation.expectedYield.toLocaleString()} kg/year
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs text-green-300 uppercase tracking-wide mb-2">Total Production</div>
                        <div className="flex justify-between">
                          <span>First 4 years:</span>
                          <span className="font-medium">
                            {((calculation.plants * 0.5) + calculation.plants + (calculation.plants * 2) + calculation.expectedYield).toLocaleString()} kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Years 5-10 (6 years):</span>
                          <span className="font-medium">
                            {(calculation.expectedYield * 6).toLocaleString()} kg
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Years 11-20 (10 years):</span>
                          <span className="font-medium">
                            {(calculation.expectedYield * 10).toLocaleString()} kg
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-green-300/30 pt-2">
                          <span className="font-semibold">20-Year Total:</span>
                          <span className="font-bold text-base">
                            {((calculation.plants * 0.5) + calculation.plants + (calculation.plants * 2) + (calculation.expectedYield * 17)).toLocaleString()} kg
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <p className="text-green-200 text-lg">
                    Enter minimum 1 acre to see detailed calculations
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
