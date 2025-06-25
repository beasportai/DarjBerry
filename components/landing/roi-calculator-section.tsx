"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "./section-title";
import {
  InvestmentCalculator,
  InvestmentCalculation,
} from "@/lib/investment-calculator";
import { 
  formatCurrency, 
  generateWhatsAppURL, 
  DARJBERRY_CONSTANTS 
} from "@/lib/shared-constants";

interface RoiCalculatorSectionProps {
  plantsPerAcre?: number;
  investmentPerPlant?: number;
  returnPerPlant?: number;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = () => {
  const [acres, setAcres] = useState<number>(1);
  const [pricePerKg, setPricePerKg] = useState<number>(DARJBERRY_CONSTANTS.DEFAULT_PRICE_PER_KG);
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

  // Generate WhatsApp contact URL with calculation data
  const getWhatsAppURL = () => {
    if (!calculation) return `https://wa.me/${DARJBERRY_CONSTANTS.WHATSAPP_NUMBER}`;
    
    return generateWhatsAppURL({
      acres,
      plants: calculation.plants,
      totalCost: calculation.totalCost,
      expectedRevenue: calculation.expectedRevenue,
      netProfit: calculation.netProfit,
      paybackPeriod: calculation.paybackPeriod,
      pricePerKg,
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] repeat"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-semibold uppercase tracking-wide">
              Investment Calculator
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
            Calculate Your Wealth Creation
          </h2>
          <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Discover how your land transforms into a{" "}
            <span className="font-bold text-white">
              tax-free income machine
            </span>{" "}
            generating
            <span className="font-bold text-yellow-300">
              {" "}
              ₹44+ lakhs annually
            </span>{" "}
            from Year 4 onwards
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/10 px-3 py-1 rounded-full">
              ✅ 2,200 plants per acre
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full">
              ✅ Tax-free agricultural income
            </div>
            <div className="bg-white/10 px-3 py-1 rounded-full">
              ✅ 20-year productive lifespan
            </div>
          </div>
        </div>
        <Card className="max-w-5xl mx-auto bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg border border-white/20 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="space-y-8">
              {/* Land Size Input */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏞️</span>
                  <Label
                    htmlFor="acres"
                    className="text-xl font-bold text-blue-100"
                  >
                    Your Land Size (in acres)
                  </Label>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Slider
                    id="acres"
                    min={1}
                    max={100}
                    step={0.5}
                    value={[acres]}
                    onValueChange={(value) => handleAcresChange(value[0])}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={1}
                      max={100}
                      step={0.5}
                      value={acres}
                      onChange={(e) =>
                        handleAcresChange(Number(e.target.value))
                      }
                      className="w-24 bg-white/20 border-2 border-blue-400/50 text-center font-bold text-2xl text-white rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30"
                    />
                    <span className="text-sm text-blue-200 font-medium">
                      acres
                    </span>
                  </div>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-500/20 border border-red-400/50 rounded-lg">
                    <p className="text-red-200 text-sm font-medium flex items-center gap-2">
                      <span>⚠️</span>
                      {error}
                    </p>
                  </div>
                )}
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="font-semibold text-blue-200 text-sm">Beginner</div>
                    <div className="text-blue-300 text-xs">1-2 acres</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="font-semibold text-blue-200 text-sm">
                      Commercial
                    </div>
                    <div className="text-blue-300 text-xs">3-10 acres</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="font-semibold text-blue-200 text-sm">
                      Enterprise
                    </div>
                    <div className="text-blue-300 text-xs">10+ acres</div>
                  </div>
                </div>
              </div>

              {/* Price Input */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 p-6 rounded-2xl border border-emerald-400/20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💰</span>
                  <Label
                    htmlFor="price"
                    className="text-xl font-bold text-emerald-100"
                  >
                    Market Price Per Kg
                  </Label>
                  <span className="bg-emerald-400/20 text-emerald-200 px-2 py-1 rounded-full text-xs font-semibold">
                    PREMIUM BERRY
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <Slider
                    id="price"
                    min={600}
                    max={1200}
                    step={50}
                    value={[pricePerKg]}
                    onValueChange={(value) => setPricePerKg(value[0])}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={600}
                      max={1200}
                      step={50}
                      value={pricePerKg}
                      onChange={(e) => setPricePerKg(Number(e.target.value))}
                      className="w-24 bg-white/20 border-2 border-emerald-400/50 text-center font-bold text-2xl text-white rounded-xl focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    />
                    <span className="text-sm text-emerald-200 font-medium">
                      ₹/kg
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="text-center p-4 bg-orange-500/20 rounded-lg border border-orange-400/30">
                    <div className="font-semibold text-orange-200 text-lg">₹600</div>
                    <div className="text-orange-300 text-sm">Local Market</div>
                  </div>
                  <div className="text-center p-4 bg-emerald-500/30 rounded-lg border-2 border-emerald-400/50">
                    <div className="font-semibold text-emerald-200 text-lg">₹800</div>
                    <div className="text-emerald-300 text-sm">
                      Premium Grade
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
                    <div className="font-semibold text-purple-200 text-lg">₹1000+</div>
                    <div className="text-purple-300 text-sm">
                      Export Quality
                    </div>
                  </div>
                </div>
              </div>

              {calculation ? (
                <>
                  {/* Key Metrics with Psychological Impact */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 md:p-6 rounded-2xl border border-blue-400/30 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">🌿</span>
                        <div>
                          <p className="text-xs md:text-sm uppercase tracking-wider text-blue-200 font-semibold">
                            Your Farm Scale
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl md:text-3xl font-bold text-white mb-2 break-words">
                        {calculation.plants.toLocaleString("en-IN")} plants
                      </p>
                      <div className="text-xs md:text-sm text-blue-200">
                        <div className="flex justify-between">
                          <span>Density:</span>
                          <span className="font-semibold">2,200/acre</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coverage:</span>
                          <span className="font-semibold">{acres} acres</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-4 md:p-6 rounded-2xl border border-orange-400/30 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">💎</span>
                        <div>
                          <p className="text-xs md:text-sm uppercase tracking-wider text-orange-200 font-semibold">
                            One-Time Investment
                          </p>
                        </div>
                      </div>
                      <p className="text-xl md:text-3xl font-bold text-white mb-2 break-words">
                        {formatCurrency(calculation.totalCost)}
                      </p>
                      <div className="text-xs md:text-sm text-orange-200">
                        <div className="flex justify-between">
                          <span>Per plant:</span>
                          <span className="font-semibold">₹4,000</span>
                        </div>
                        <div className="text-xs bg-orange-500/20 px-2 md:px-3 py-2 rounded-lg mt-2 leading-relaxed">
                          <div className="font-semibold mb-1">₹4,000/plant includes:</div>
                          <div>• Setup & soil preparation</div>
                          <div>• Protected cultivation infrastructure</div>
                          <div>• Expert agronomy services</div>
                          <div>• Professional irrigation system</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/30 to-green-500/30 p-4 md:p-6 rounded-2xl border-2 border-emerald-400/50 ring-2 ring-emerald-400/20 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl md:text-3xl">⚡</span>
                        <div>
                          <p className="text-xs md:text-sm uppercase tracking-wider text-emerald-200 font-semibold">
                            Money Back In
                          </p>
                        </div>
                      </div>
                      <p className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {calculation.paybackPeriod.toFixed(1)} years
                      </p>
                      <div className="text-xs md:text-sm text-emerald-200">
                        <div className="bg-emerald-500/20 px-2 md:px-3 py-1 rounded-full text-center">
                          <span className="font-semibold">
                            Faster than fixed deposits!
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white/15 to-white/5 p-4 sm:p-8 rounded-2xl mx-auto max-w-6xl border border-white/20 shadow-2xl">
                    <div className="text-center mb-6">
                      <h4 className="font-bold text-white text-xl sm:text-2xl mb-2">
                        Your Growth Journey
                      </h4>
                      <p className="text-green-200 text-sm sm:text-base">
                        Watch your investment multiply year after year
                      </p>
                    </div>

                    {/* Growth Timeline - Mobile */}
                    <div className="block sm:hidden">
                      <div className="space-y-4">
                        {/* Years 1-3: Growth Phase */}
                        <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border-l-4 border-orange-400">
                          <div className="text-xs text-orange-200 uppercase tracking-wide mb-2 font-semibold">
                            🌱 Growth Phase (Years 1-3)
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">Year 1</span>
                              <div className="text-right">
                                <div className="text-xs text-orange-200">
                                  0.5kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {(calculation.plants * 0.5).toLocaleString()}{" "}
                                  kg
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">Year 2</span>
                              <div className="text-right">
                                <div className="text-xs text-orange-200">
                                  1kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {calculation.plants.toLocaleString()} kg
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">Year 3</span>
                              <div className="text-right">
                                <div className="text-xs text-orange-200">
                                  2kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {(calculation.plants * 2).toLocaleString()} kg
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Year 4: Maturity */}
                        <div className="bg-gradient-to-r from-emerald-500/30 to-green-500/30 p-4 rounded-xl border-l-4 border-emerald-400 ring-2 ring-emerald-400/50">
                          <div className="text-xs text-emerald-200 uppercase tracking-wide mb-2 font-semibold">
                            🎯 Full Production (Year 4)
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white font-semibold">
                              Year 4
                            </span>
                            <div className="text-right">
                              <div className="text-xs text-emerald-200">
                                3kg/plant
                              </div>
                              <div className="font-bold text-xl text-white">
                                {calculation.expectedYield.toLocaleString()} kg
                              </div>
                              <div className="text-xs text-emerald-300">
                                Maximum yield reached!
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Years 5-20: Peak Performance */}
                        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-xl border-l-4 border-blue-400">
                          <div className="text-xs text-blue-200 uppercase tracking-wide mb-2 font-semibold">
                            💎 Peak Performance (Years 5-20)
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">Year 5</span>
                              <div className="text-right">
                                <div className="text-xs text-blue-200">
                                  3kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {calculation.expectedYield.toLocaleString()}{" "}
                                  kg
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">
                                Year 10
                              </span>
                              <div className="text-right">
                                <div className="text-xs text-blue-200">
                                  3kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {calculation.expectedYield.toLocaleString()}{" "}
                                  kg
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-white">
                                Year 20
                              </span>
                              <div className="text-right">
                                <div className="text-xs text-blue-200">
                                  3kg/plant
                                </div>
                                <div className="font-bold text-white">
                                  {calculation.expectedYield.toLocaleString()}{" "}
                                  kg
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 p-2 bg-white/10 rounded text-center">
                            <div className="text-xs text-blue-300">
                              Consistent peak production
                            </div>
                            <div className="text-sm font-bold text-white">
                              16 years of maximum returns
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tablet Layout */}
                    <div className="hidden sm:block lg:hidden">
                      {/* Growth Phase */}
                      <div className="mb-6">
                        <div className="text-center mb-4">
                          <span className="bg-orange-500/20 text-orange-200 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            🌱 Growth Phase
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-400/30">
                              <div className="text-xs text-orange-300 uppercase tracking-wide mb-1">
                                Year 1
                              </div>
                              <div className="text-xs text-orange-200 mb-2">
                                0.5kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {(calculation.plants * 0.5).toLocaleString()} kg
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-400/30">
                              <div className="text-xs text-orange-300 uppercase tracking-wide mb-1">
                                Year 2
                              </div>
                              <div className="text-xs text-orange-200 mb-2">
                                1kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {calculation.plants.toLocaleString()} kg
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-400/30">
                              <div className="text-xs text-orange-300 uppercase tracking-wide mb-1">
                                Year 3
                              </div>
                              <div className="text-xs text-orange-200 mb-2">
                                2kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {(calculation.plants * 2).toLocaleString()} kg
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Maturity & Peak */}
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-emerald-500/30 to-green-500/30 p-4 rounded-xl border-2 border-emerald-400/50 ring-2 ring-emerald-400/30">
                            <div className="text-xs text-emerald-300 uppercase tracking-wide mb-1">
                              Year 4
                            </div>
                            <div className="text-xs text-emerald-200 mb-2">
                              🎯 Peak
                            </div>
                            <div className="font-bold text-xl text-white">
                              {calculation.expectedYield.toLocaleString()} kg
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30">
                            <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">
                              Year 5
                            </div>
                            <div className="text-xs text-blue-200 mb-2">
                              3kg/plant
                            </div>
                            <div className="font-bold text-lg text-white">
                              {calculation.expectedYield.toLocaleString()} kg
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30">
                            <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">
                              Year 10
                            </div>
                            <div className="text-xs text-blue-200 mb-2">
                              3kg/plant
                            </div>
                            <div className="font-bold text-lg text-white">
                              {calculation.expectedYield.toLocaleString()} kg
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-xl border border-blue-400/30">
                            <div className="text-xs text-blue-300 uppercase tracking-wide mb-1">
                              Year 20
                            </div>
                            <div className="text-xs text-blue-200 mb-2">
                              3kg/plant
                            </div>
                            <div className="font-bold text-lg text-white">
                              {calculation.expectedYield.toLocaleString()} kg
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden lg:block">
                      <div className="relative">
                        {/* Progress Arrow */}
                        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 via-emerald-400 to-blue-400 opacity-30"></div>

                        <div className="grid grid-cols-7 gap-6 relative z-10">
                          {/* Growth Phase */}
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 p-5 rounded-2xl border border-orange-400/40 hover:border-orange-400/60 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-orange-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 1
                              </div>
                              <div className="text-xs text-orange-200 mb-3">
                                🌱 Starting
                              </div>
                              <div className="text-xs text-orange-200 mb-1">
                                0.5kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {(calculation.plants * 0.5).toLocaleString()} kg
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="bg-gradient-to-br from-orange-500/25 to-yellow-500/25 p-5 rounded-2xl border border-orange-400/50 hover:border-orange-400/70 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-orange-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 2
                              </div>
                              <div className="text-xs text-orange-200 mb-3">
                                📈 Growing
                              </div>
                              <div className="text-xs text-orange-200 mb-1">
                                1kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {calculation.plants.toLocaleString()} kg
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="bg-gradient-to-br from-yellow-500/25 to-emerald-500/25 p-5 rounded-2xl border border-yellow-400/50 hover:border-yellow-400/70 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-yellow-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 3
                              </div>
                              <div className="text-xs text-yellow-200 mb-3">
                                ⚡ Accelerating
                              </div>
                              <div className="text-xs text-yellow-200 mb-1">
                                2kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {(calculation.plants * 2).toLocaleString()} kg
                              </div>
                            </div>
                          </div>

                          {/* Peak Performance */}
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-emerald-500/40 to-green-500/40 p-5 rounded-2xl border-2 border-emerald-400/70 ring-4 ring-emerald-400/20 hover:ring-emerald-400/40 transition-all duration-300 hover:scale-110 shadow-2xl">
                              <div className="text-xs text-emerald-300 uppercase tracking-wide mb-2 font-bold">
                                Year 4
                              </div>
                              <div className="text-xs text-emerald-200 mb-3">
                                🎯 PEAK REACHED
                              </div>
                              <div className="text-xs text-emerald-200 mb-1">
                                3kg/plant
                              </div>
                              <div className="font-bold text-2xl text-white drop-shadow-lg">
                                {calculation.expectedYield.toLocaleString()} kg
                              </div>
                              <div className="text-xs text-emerald-300 mt-1">
                                Maximum yield!
                              </div>
                            </div>
                          </div>

                          {/* Consistent Performance */}
                          <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-500/25 to-purple-500/25 p-5 rounded-2xl border border-blue-400/50 hover:border-blue-400/70 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-blue-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 5
                              </div>
                              <div className="text-xs text-blue-200 mb-3">
                                💎 Consistent
                              </div>
                              <div className="text-xs text-blue-200 mb-1">
                                3kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {calculation.expectedYield.toLocaleString()} kg
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-500/25 to-purple-500/25 p-5 rounded-2xl border border-blue-400/50 hover:border-blue-400/70 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-blue-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 10
                              </div>
                              <div className="text-xs text-blue-200 mb-3">
                                🏆 Established
                              </div>
                              <div className="text-xs text-blue-200 mb-1">
                                3kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {calculation.expectedYield.toLocaleString()} kg
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="bg-gradient-to-br from-purple-500/25 to-indigo-500/25 p-5 rounded-2xl border border-purple-400/50 hover:border-purple-400/70 transition-all duration-300 hover:scale-105">
                              <div className="text-xs text-purple-300 uppercase tracking-wide mb-2 font-semibold">
                                Year 20
                              </div>
                              <div className="text-xs text-purple-200 mb-3">
                                👑 Legacy
                              </div>
                              <div className="text-xs text-purple-200 mb-1">
                                3kg/plant
                              </div>
                              <div className="font-bold text-lg text-white">
                                {calculation.expectedYield.toLocaleString()} kg
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-white/10 p-4 rounded-xl text-center">
                        <div className="text-2xl mb-2">🚀</div>
                        <div className="text-xs text-green-300 uppercase tracking-wide">
                          Yield Growth
                        </div>
                        <div className="font-bold text-white">
                          6x increase
                        </div>
                        <div className="text-xs text-green-200">
                          0.5kg → 3kg per plant
                        </div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl text-center">
                        <div className="text-2xl mb-2">⏰</div>
                        <div className="text-xs text-blue-300 uppercase tracking-wide">
                          Peak Duration
                        </div>
                        <div className="font-bold text-white">17 years</div>
                        <div className="text-xs text-blue-200">
                          Years 4-20 at maximum
                        </div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-xs text-purple-300 uppercase tracking-wide">
                          Total Harvest
                        </div>
                        <div className="font-bold text-white">
                          {(
                            calculation.plants * 0.5 +
                            calculation.plants +
                            calculation.plants * 2 +
                            calculation.expectedYield * 17
                          ).toLocaleString()}{" "}
                          kg
                        </div>
                        <div className="text-xs text-purple-200">
                          Over 20 years
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Revenue Showcase with Psychological Impact */}
                  <div className="bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-red-400/20 p-8 rounded-3xl border-2 border-yellow-400/30 shadow-2xl relative overflow-hidden">
                    {/* Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-orange-400/10 animate-pulse"></div>

                    <div className="relative z-10 text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl">💰</span>
                        <div>
                          <p className="text-sm uppercase tracking-wider text-yellow-200 font-bold">
                            Your Annual Income Stream
                          </p>
                          <p className="text-xs text-yellow-300">
                            Tax-free from Year 4 onwards
                          </p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-2xl mb-2 break-words">
                          {formatCurrency(calculation.expectedRevenue)}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-base sm:text-lg">
                          <span className="text-yellow-200">Gross Revenue</span>
                          <span className="text-yellow-400 hidden sm:inline">•</span>
                          <span className="text-emerald-200 font-bold text-center">
                            {formatCurrency(calculation.netProfit)} Net Profit
                          </span>
                        </div>
                      </div>

                      {/* Profit Timeline */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                        <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 p-6 rounded-xl border border-blue-400/30">
                          <div className="text-sm text-blue-200 uppercase tracking-wide mb-2">
                            First 5 Years
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {formatCurrency(calculation.fiveYearProfit)}
                          </div>
                          <div className="text-xs text-blue-300">
                            Including growth phase
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500/30 to-green-500/30 p-6 rounded-xl border-2 border-emerald-400/50 ring-2 ring-emerald-400/20">
                          <div className="text-sm text-emerald-200 uppercase tracking-wide mb-2">
                            First 10 Years
                          </div>
                          <div className="text-3xl font-bold text-white mb-1">
                            {formatCurrency(calculation.tenYearProfit)}
                          </div>
                          <div className="text-xs text-emerald-300 font-semibold">
                            Peak performance phase
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30 p-6 rounded-xl border border-purple-400/30">
                          <div className="text-sm text-purple-200 uppercase tracking-wide mb-2">
                            Full 20 Years
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {formatCurrency(calculation.twentyYearProfit)}
                          </div>
                          <div className="text-xs text-purple-300">
                            Complete lifecycle profit
                          </div>
                        </div>
                      </div>

                      {/* Value Proposition */}
                      <div className="mt-8 p-4 bg-white/10 rounded-xl">
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">✅</span>
                            <span className="text-white">
                              Tax-free income under Section 10(1)
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-green-400">✅</span>
                            <span className="text-white">
                              Expert management included
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Contact Button */}
                  <div className="mt-12 text-center">
                    <a
                      href={getWhatsAppURL()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 sm:py-4 sm:px-8 text-sm sm:text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20 w-full max-w-sm sm:max-w-none sm:w-auto">
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💬</span>
                        <span className="block sm:inline">
                          <span className="sm:hidden">Get Proposal on WhatsApp</span>
                          <span className="hidden sm:inline">Get Your Personalized Proposal on WhatsApp</span>
                        </span>
                      </Button>
                    </a>
                    <p className="text-green-200 text-xs sm:text-sm mt-3 px-4 sm:px-0">
                      Your calculation details will be shared automatically
                    </p>
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
