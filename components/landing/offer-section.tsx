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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Urgency Banner */}
        <div className="text-center mb-8">
          <Badge className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-bold animate-pulse shadow-lg">
            <Zap className="w-5 h-5 mr-2" />
            {urgencyText}
          </Badge>
        </div>

        <SectionTitle
          title="The Darjberry Wealth Accelerator"
          subtitle="Everything you need to transform your land into a passive income empire - with zero effort from you."
        />
        
        <div className="max-w-6xl mx-auto">
          {/* Main Offer Card */}
          <Card className="shadow-2xl border-2 border-purple-400 bg-white overflow-hidden mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
              <div className="text-center">
                <CardTitle className="text-4xl font-bold mb-2 flex items-center justify-center">
                  🌟 Complete Blueberry Empire
                </CardTitle>
                <p className="text-xl text-purple-100">
                  Turn-Key Solution for Generational Wealth
                </p>
                <div className="flex items-center justify-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-lg">Premium Package</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Core Package */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-600" />
                  Core Wealth Package
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {offerItems.map((item, index) => (
                    <Card key={index} className="border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-lg text-gray-800 flex-1">
                            {item.title}
                          </h4>
                          <Badge className="bg-green-100 text-green-800 ml-2 text-sm font-bold">
                            {item.value}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        {item.included && (
                          <div className="flex items-center text-xs text-green-700 bg-green-50 p-2 rounded">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {item.included}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Bonus Section */}
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-600" />
                  🎁 Exclusive Founder Bonuses
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {bonusItems.map((item, index) => (
                    <Card key={index} className="border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 bg-gradient-to-br from-purple-50 to-blue-50 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-lg text-gray-800 flex-1">
                            {item.title}
                          </h4>
                          <Badge className="bg-purple-100 text-purple-800 ml-2 text-sm font-bold">
                            {item.value}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        {item.urgency && (
                          <div className="flex items-center text-xs text-red-600 font-medium bg-red-50 p-2 rounded">
                            <Clock className="w-4 h-4 mr-2" />
                            {item.urgency}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Pricing Section */}
              <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200 shadow-inner">
                <div className="mb-6">
                  <p className="text-lg text-gray-600 mb-2">
                    Total Package Value:
                  </p>
                  <p className="text-3xl font-bold text-gray-500 line-through decoration-red-500 decoration-4">
                    {totalValue}
                  </p>
                </div>
                
                <div className="mb-6">
                  <p className="text-xl text-gray-800 mb-2">
                    Your Investment Today:
                  </p>
                  <p className="text-6xl font-extrabold text-green-600 drop-shadow-lg">
                    {investmentAmount}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-300 rounded-xl p-6 mb-6 shadow-lg">
                  <p className="text-2xl font-bold text-red-800 mb-2">
                    💰 You Save: {savings}
                  </p>
                  <p className="text-lg text-red-600 font-semibold">
                    That's 66% OFF the individual package value!
                  </p>
                  <p className="text-sm text-red-700 mt-2">
                    ⏰ This offer expires when all 9 spots are filled
                  </p>
                </div>
                
                <p className="text-gray-600 text-sm bg-white/80 p-3 rounded">
                  {investmentNote}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Scarcity Section */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-3xl font-bold mb-6 flex items-center justify-center">
                🚨 Why Only 9 Spots Available?
              </h3>
              <p className="text-xl mb-8 leading-relaxed">
                {availabilityReason}
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                {scarcityFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-center bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                    <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                    <span className="font-medium">{factor}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-bold">
                  ⚡ Secure your spot before they're gone!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};