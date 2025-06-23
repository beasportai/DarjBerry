"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { SectionTitle } from "./section-title";

interface RoiCalculatorSectionProps {
  plantsPerAcre?: number;
  investmentPerPlant?: number;
  returnPerPlant?: number;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({
  plantsPerAcre = 1000,
  investmentPerPlant = 4000,
  returnPerPlant = 20000,
}) => {
  const [acres, setAcres] = useState(1);

  const totalPlants = acres * plantsPerAcre;
  const totalInvestment = totalPlants * investmentPerPlant;
  const totalReturn = totalPlants * returnPerPlant;
  const netProfit = totalReturn - totalInvestment;

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
          subtitle="Use our interactive calculator to project your tax-free returns. See the power of your land."
        />
        <Card className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white shadow-xl">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="acres" className="text-lg font-semibold">
                  Your Land Size (in acres)
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    id="acres"
                    min={0.5}
                    max={10}
                    step={0.5}
                    value={[acres]}
                    onValueChange={(value) => setAcres(value[0])}
                  />
                  <Input
                    type="number"
                    value={acres}
                    onChange={(e) => setAcres(Number(e.target.value))}
                    className="w-24 bg-white/20 border-white/30 text-center font-bold text-xl"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 text-center">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm uppercase tracking-wider text-green-200">
                    Total Plants
                  </p>
                  <p className="text-3xl font-bold">
                    {totalPlants.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm uppercase tracking-wider text-green-200">
                    Initial Investment
                  </p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(totalInvestment)}
                  </p>
                </div>
              </div>
              <div className="bg-white/20 p-6 rounded-lg text-center">
                <p className="text-lg uppercase tracking-wider text-green-100">
                  Projected 15-Year Gross Return
                </p>
                <p className="text-6xl font-extrabold mt-2 drop-shadow-lg">
                  {formatCurrency(totalReturn)}
                </p>
                <p className="mt-2 text-xl font-semibold text-green-200">
                  Net Profit: {formatCurrency(netProfit)} (5X ROI)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
