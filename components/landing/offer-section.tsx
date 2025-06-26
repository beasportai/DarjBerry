import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { InvestmentCalculator } from "@/lib/investment-calculator";
import { DARJBERRY_CONSTANTS } from "@/lib/shared-constants";
import { useState } from "react";

interface OfferItem {
  title: string;
  description: string;
  value: string;
  included?: string;
}

interface BonusItem {
  title: string;
  description: string;
  value: string;
  urgency?: string;
}

interface OfferSectionProps {
  offerItems: OfferItem[];
  bonusItems: BonusItem[];
  totalValue: string;
  investmentAmount: string;
  savings: string;
  investmentNote: string;
  urgencyText: string;
  availabilityReason: string;
  scarcityFactors: string[];
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  offerItems,
  bonusItems,
  totalValue,
  investmentAmount,
  savings,
  investmentNote,
  urgencyText,
  availabilityReason,
  scarcityFactors,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const standardCalculation = InvestmentCalculator.calculate(1, DARJBERRY_CONSTANTS.DEFAULT_PRICE_PER_KG);
  const dynamicPaybackPeriod = standardCalculation.paybackPeriod;

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        
        {/* Compact Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
            <span className="text-xl">🌱</span>
            <span className="text-sm font-bold text-white uppercase tracking-wide">Managed Farming Investment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
            Darjberry Farming Partnership
          </h2>
          <p className="text-base sm:text-lg text-green-100 max-w-3xl mx-auto">
            Professional managed blueberry farming with <span className="font-bold text-white">tax-free agricultural income</span> potential.
          </p>
        </div>
        
        {/* Main Value Proposition Card */}
        <Card className="shadow-2xl border-2 border-emerald-400/50 bg-white overflow-hidden mb-6">
          <CardHeader className="bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white p-6 relative">
            <div className="text-center">
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-3">
                Complete Blueberry Farming Package
              </CardTitle>
              <p className="text-green-100 mb-4">
                Turnkey solution with expert management and infrastructure
              </p>
              
              {/* Key Metrics Grid - Compact */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-xl font-bold text-green-200">15-20</div>
                  <div className="text-xs text-green-300">Years</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-xl font-bold text-blue-200">500%</div>
                  <div className="text-xs text-blue-300">ROI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-xl font-bold text-yellow-200">{dynamicPaybackPeriod.toFixed(1)}</div>
                  <div className="text-xs text-yellow-300">Payback</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <div className="text-xl font-bold text-purple-200">₹4k</div>
                  <div className="text-xs text-purple-300">Per Plant</div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6">
            {/* What's Included - Simplified */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                What's Included
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {offerItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{item.title.replace(/🏭|🧑‍🌾|🚚|🛡️/g, '').trim()}</h4>
                      <p className="text-xs text-gray-600 mt-1">{item.included}</p>
                      {/* Show description with HTML links for Risk Protection Package */}
                      {item.title.includes('🛡️') && (
                        <div 
                          className="text-xs text-gray-500 mt-1" 
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonus Items - Compact */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Bonus Benefits</h3>
              <div className="grid grid-cols-2 gap-2">
                {bonusItems.slice(0, 4).map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                    <div className="text-xs font-bold text-purple-700 mb-1">
                      BONUS #{index + 1}
                    </div>
                    <div className="text-sm font-semibold text-gray-800 leading-tight">
                      {item.title.replace(/🎁 BONUS #\d+: /g, '')}
                    </div>
                    <div className="text-xs text-purple-600 font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
              
              {/* Optional Insurance - Separate highlight */}
              {bonusItems.length > 4 && (
                <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <div className="text-xs font-bold text-blue-700 mb-1">
                    OPTIONAL ADD-ON
                  </div>
                  <div className="text-sm font-semibold text-gray-800 leading-tight">
                    {bonusItems[4].title.replace(/🎁 BONUS #\d+: /g, '')}
                  </div>
                  <div 
                    className="text-xs text-blue-600 mt-1" 
                    dangerouslySetInnerHTML={{ __html: bonusItems[4].description }}
                  />
                  <div className="text-xs text-blue-600 font-medium mt-1">{bonusItems[4].urgency}</div>
                </div>
              )}
            </div>

            {/* Investment Summary - Streamlined */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-300">
              <div className="text-center mb-4">
                <p className="text-4xl sm:text-5xl font-bold text-emerald-600 mb-2">
                  {investmentAmount}
                </p>
                <p className="text-sm text-gray-600">
                  Complete package - <span className="font-bold text-green-600">₹4,000 per plant</span>
                </p>
              </div>
              
              {/* Key Details - Compact */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-center p-2 bg-white/80 rounded-lg">
                  <div className="font-bold text-green-600">{dynamicPaybackPeriod.toFixed(1)} years</div>
                  <div className="text-xs text-gray-600">Payback Period</div>
                </div>
                <div className="text-center p-2 bg-white/80 rounded-lg">
                  <div className="font-bold text-blue-600">2kg/plant</div>
                  <div className="text-xs text-gray-600">Year 4 Guarantee</div>
                </div>
              </div>
            </div>

            {/* Expandable Details */}
            <div className="mt-4">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {showDetails ? 'Hide Details' : 'Show More Details'}
                </span>
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {showDetails && (
                <div className="mt-4 space-y-4 animate-in slide-in-from-top duration-300">
                  {/* Payment Options */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Options</h4>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <div className="font-medium text-blue-800">💳 One-Time</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded text-center">
                        <div className="font-medium text-purple-800">📅 Installments</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="font-medium text-green-800">🏦 Loan Support</div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Note */}
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-blue-800 text-xs">
                      <strong>Important:</strong> {investmentNote}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};