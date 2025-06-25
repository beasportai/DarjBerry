import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "./section-title";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Shield, TrendingUp, Star, Zap } from "lucide-react";

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
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <span className="text-2xl">🌱</span>
            <span className="text-lg font-bold text-white uppercase tracking-wide">Managed Farming Investment</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
            Darjberry Farming Partnership
          </h2>
          <p className="text-lg sm:text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
            Professional managed blueberry farming with comprehensive services, expert management, and 
            <span className="font-bold text-white"> tax-free agricultural income</span> potential.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
              <span className="text-emerald-200 text-sm font-semibold">✅ Tax-Free Income</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
              <span className="text-blue-200 text-sm font-semibold">✅ 500% ROI Projection</span>
            </div>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-400/30">
              <span className="text-purple-200 text-sm font-semibold">✅ 15-20 Year Partnership</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Main Offer Card */}
          <Card className="shadow-2xl border-2 border-emerald-400/50 bg-white overflow-hidden mb-8">
            <CardHeader className="bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white p-10 relative overflow-hidden">
              {/* Subtle Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIzIi8+PC9nPjwvZz48L3N2Zz4=')] repeat"></div>
              </div>
              
              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
                  <span className="text-2xl">🌱</span>
                  <span className="text-sm font-bold uppercase tracking-wide">Managed Agricultural Investment</span>
                </div>
                
                <CardTitle className="text-4xl sm:text-5xl font-bold mb-4">
                  Complete Blueberry Farming Package
                </CardTitle>
                <p className="text-xl text-green-100 mb-6 leading-relaxed">
                  Comprehensive turnkey solution for premium blueberry cultivation with expert management and infrastructure
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-200">15-20</div>
                    <div className="text-sm text-green-300">Years Partnership</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-bold text-blue-200">500%</div>
                    <div className="text-sm text-blue-300">Projected ROI</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-bold text-yellow-200">3.5</div>
                    <div className="text-sm text-yellow-300">Years Payback</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="text-3xl font-bold text-purple-200">₹4k</div>
                    <div className="text-sm text-purple-300">Per Plant</div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-10">
              {/* Core Package */}
              <div className="mb-12">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                    <Shield className="w-8 h-8 mr-4 text-green-600" />
                    Complete Service Package
                  </h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Professional infrastructure setup and <span className="font-bold text-green-600">15 years of expert management</span> included in your investment
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {offerItems.map((item, index) => (
                    <Card key={index} className="border-3 border-green-200 hover:border-green-400 transition-all duration-500 hover:shadow-2xl transform hover:scale-105 bg-gradient-to-br from-white to-green-50 group">
                      <CardContent className="p-8 relative overflow-hidden">
                        {/* Card Number */}
                        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-bold text-2xl text-gray-800 flex-1 group-hover:text-green-700 transition-colors">
                              {item.title}
                            </h4>
                          </div>
                          <div className="mb-4">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold px-4 py-2 shadow-lg">
                              {item.value}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {item.included && (
                          <div className="flex items-center text-green-800 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-300">
                            <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                            <span className="font-semibold text-base">{item.included}</span>
                          </div>
                        )}
                        
                        {/* Hover Effect Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="mb-12">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-blue-400/30">
                    <span className="text-2xl">📋</span>
                    <span className="text-lg font-bold text-blue-800 uppercase tracking-wide">Additional Services</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Value-Added Support Services
                  </h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Comprehensive support services included to ensure optimal farm performance and profitability
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {bonusItems.map((item, index) => (
                    <Card key={index} className="border-3 border-purple-300 hover:border-purple-500 transition-all duration-500 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 hover:shadow-2xl transform hover:scale-105 group relative overflow-hidden">
                      {/* Bonus Badge */}
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 transform rotate-12 translate-x-4 -translate-y-2 font-bold text-sm shadow-lg">
                        BONUS #{index + 1}
                      </div>
                      
                      <CardContent className="p-8 relative">
                        <div className="mb-6">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="font-bold text-2xl text-gray-800 flex-1 group-hover:text-purple-700 transition-colors leading-tight">
                              {item.title}
                            </h4>
                          </div>
                          <div className="mb-4">
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-lg font-bold px-6 py-3 shadow-lg">
                              {item.value}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                          {item.description}
                        </p>
                        
                        {item.urgency && (
                          <div className="flex items-center text-red-700 font-bold bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-xl border-2 border-red-300 animate-pulse">
                            <Clock className="w-6 h-6 mr-3 text-red-600" />
                            <span className="text-base">{item.urgency}</span>
                          </div>
                        )}
                        
                        {/* Sparkle Effect */}
                        <div className="absolute top-4 left-4 text-3xl opacity-70 group-hover:animate-spin">
                          ✨
                        </div>
                        
                        {/* Hover Effect Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Investment Summary */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 p-10 rounded-3xl border-2 border-green-300 shadow-xl">
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Investment Summary
                    </h3>
                    <p className="text-lg text-gray-700">
                      Complete package pricing for 1 acre (2,200 plants)
                    </p>
                  </div>
                  
                  {/* Main Price */}
                  <div className="mb-8 text-center">
                    <div className="inline-block">
                      <p className="text-6xl sm:text-7xl font-bold text-emerald-600 mb-4">
                        {investmentAmount}
                      </p>
                      <p className="text-xl text-gray-600 mb-4">
                        Complete turnkey solution - <span className="font-bold text-green-600">₹4,000 per plant</span>
                      </p>
                      <div className="bg-green-100 p-4 rounded-xl border border-green-300">
                        <p className="text-sm text-green-800 font-medium">
                          <strong>Investment Breakdown:</strong> ₹88,00,000 for 2,200 plants including infrastructure, setup, and 15 years of professional management
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Options */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-xl border-2 border-blue-300">
                      <div className="text-center">
                        <h4 className="font-bold text-xl text-blue-800 mb-2">💳 One-Time Payment</h4>
                        <p className="text-blue-600">Pay in full and save more</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300">
                      <div className="text-center">
                        <h4 className="font-bold text-xl text-purple-800 mb-2">📅 Installments</h4>
                        <p className="text-purple-600">Flexible payment plans available</p>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl border-2 border-green-300">
                      <div className="text-center">
                        <h4 className="font-bold text-xl text-green-800 mb-2">🏦 Loan Support</h4>
                        <p className="text-green-600">Agricultural loan assistance</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Investment Details */}
                  <div className="bg-white border-2 border-gray-200 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Key Investment Details</h4>
                    <div className="space-y-3 sm:space-y-2 text-sm sm:text-base text-gray-700">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium">Payback Period:</span>
                        <span className="font-semibold text-green-600 sm:text-gray-900">3.5 years</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium">Projected ROI:</span>
                        <span className="font-semibold text-green-600 sm:text-gray-900">500% over 15 years</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium">Management Period:</span>
                        <span className="font-semibold text-green-600 sm:text-gray-900">15 years included</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="font-medium">Production Guarantee:</span>
                        <span className="font-semibold text-green-600 sm:text-gray-900">2kg/plant by Year 4</span>
                      </div>
                    </div>
                  </div>

                  {/* Investment Note */}
                  <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl mt-6">
                    <p className="text-blue-800 text-sm leading-relaxed">
                      <strong>Important:</strong> {investmentNote}
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold text-green-600">15-20</div>
                      <div className="text-sm text-gray-600">Years Partnership</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold text-blue-600">₹20k</div>
                      <div className="text-sm text-gray-600">Return/Plant</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold text-purple-600">0%</div>
                      <div className="text-sm text-gray-600">Tax Rate</div>
                    </div>
                    <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold text-orange-600">100%</div>
                      <div className="text-sm text-gray-600">Managed</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};