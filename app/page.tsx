'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Star, Check, TrendingUp, Shield, Leaf, Users, Clock, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'lumpsum3L' | 'dailySIP'>('dailySIP');
  const [subscriptionTier, setSubscriptionTier] = useState<'1year' | '2year'>('1year');
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);

  // Revenue projection data for 10 years (1 acre = 2500 plants)
  const revenueData = [
    { year: 'Y1', revenue: 0, cumulative: -36, investment: 36 },
    { year: 'Y2', revenue: 12.5, cumulative: -23.5, investment: 0 },
    { year: 'Y3', revenue: 25, cumulative: 1.5, investment: 0 },
    { year: 'Y4', revenue: 37.5, cumulative: 39, investment: 0 },
    { year: 'Y5', revenue: 37.5, cumulative: 76.5, investment: 0 },
    { year: 'Y6', revenue: 37.5, cumulative: 114, investment: 0 },
    { year: 'Y7', revenue: 37.5, cumulative: 151.5, investment: 0 },
    { year: 'Y8', revenue: 37.5, cumulative: 189, investment: 0 },
    { year: 'Y9', revenue: 37.5, cumulative: 226.5, investment: 0 },
    { year: 'Y10', revenue: 37.5, cumulative: 264, investment: 0 }
  ];

  // Production timeline data
  const productionData = [
    { year: 'Year 1', plants: 90, yield: 0, stage: 'Planting' },
    { year: 'Year 2', plants: 90, yield: 90, stage: 'First Harvest' },
    { year: 'Year 3', plants: 90, yield: 180, stage: 'Growing' },
    { year: 'Year 4', plants: 90, yield: 270, stage: 'Peak Production' },
    { year: 'Year 5', plants: 90, yield: 270, stage: 'Stable' }
  ];

  const handleWhatsAppConsultation = () => {
    const message = `Hi Darjberry! 🫐

I'm interested in growing berries and earning passive tax-free income.

📍 My Location: ${customerData.location || 'Please provide location'}
📞 Contact: ${customerData.phone || 'Please provide phone'}
💰 Investment Interest: ${selectedPlan === 'dailySIP' ? '₹9,999 Daily SIP (90 plants/month)' : 'Land + Blueberry Package (₹65L/0.5 acre)'}

I'd like to know more about:
- Setup process on my land or Himalayas
- Expected returns and timeline
- Capital protection details
- How Darjberry handles everything

Ready to be part of India's Amul for Berries! 🌱`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/917047474942?text=${encodedMessage}`, '_blank');
  };

  const handlePayment = async () => {
    if (!customerData.name || !customerData.email || !customerData.phone) {
      alert('Please fill all details before proceeding');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/cashfree/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: selectedPlan,
          subscriptionTier: subscriptionTier,
          customerDetails: customerData,
          landingPageData: {
            source: 'main_landing',
            location: customerData.location,
            timestamp: new Date().toISOString()
          }
        })
      });

      const data = await response.json();
      
      if (data.success && data.subscription.subscriptionPaymentLink) {
        window.open(data.subscription.subscriptionPaymentLink, '_blank');
      } else {
        throw new Error(data.error || 'Payment setup failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment setup failed. Please try WhatsApp consultation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Hero Section with Core Offer */}
      <section className="relative bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596169901406-0adac875fb37?q=80&w=2940')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-green-100 text-green-800 px-4 py-2 text-sm">
            🏔️ Darjeeling Blueberry Farms • Tax-Free Income • Capital Protected
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent leading-tight">
            Grow Berries on Your Land<br />or in the Himalayas
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed px-4">
            <strong>Earn Passive Tax-Free Income</strong><br />
            Be part of India's Amul for Berries 🫐<br />
            <span className="text-base sm:text-lg text-green-600 font-semibold">We take care of setup, growing, selling • Capital protected business</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 justify-center items-center mb-12 max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md border-2 border-green-200 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">₹500/kg</div>
              <div className="text-xs sm:text-sm text-gray-600">Current market price</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-200 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">3-4 years</div>
              <div className="text-xs sm:text-sm text-gray-600">Payback period</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-200 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">100% Tax-Free</div>
              <div className="text-xs sm:text-sm text-gray-600">Agricultural income</div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* 5 Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 px-4">5 Reasons to Join Darjberry Today</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* First Benefit with Graph */}
          <Card className="border-2 hover:border-green-300 transition-colors md:col-span-2 lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <CardTitle className="text-lg">₹37.5L Annual Returns</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Each acre (2500 bushes) generates ₹37.5 lakh annually from Year 3 (7500kg × ₹500/kg). Far superior to traditional crops.</p>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis label={{ value: 'Lakhs (₹)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: any) => `₹${value}L`}
                      contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', border: '1px solid #e5e7eb' }}
                    />
                    <Area type="monotone" dataKey="cumulative" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} />
                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">3 Years</div>
                  <div className="text-sm text-gray-600">Break-even</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹264L</div>
                  <div className="text-sm text-gray-600">10-year returns</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">633%</div>
                  <div className="text-sm text-gray-600">ROI in 10 years</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Other Benefits */}
          {[
            {
              icon: <Shield className="h-8 w-8 text-blue-600" />,
              title: "100% Capital Protection", 
              description: "Your investment secures physical plants and infrastructure. Multi-State Cooperative structure ensures legal protection."
            },
            {
              icon: <Leaf className="h-8 w-8 text-green-500" />,
              title: "Tax-Free Agricultural Income",
              description: "Section 10(1) exemption means zero tax on agricultural income. Additional Section 80P benefits for cooperative members."
            },
            {
              icon: <Users className="h-8 w-8 text-purple-600" />,
              title: "Complete Setup & Management",
              description: "We handle polyhouse setup, irrigation, soil prep, planting, maintenance, harvesting, and selling. You just earn."
            },
            {
              icon: <Clock className="h-8 w-8 text-orange-600" />,
              title: "Build Retirement Home from Revenue",
              description: "Farm revenue over 5-7 years can fund your dream retirement home on the same land. Live where you grow!"
            }
          ].map((benefit, index) => (
            <Card key={index} className="border-2 hover:border-green-300 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {benefit.icon}
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4 Objections Handled */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Common Concerns Addressed</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                concern: "\"What if crops fail or weather damages?\"",
                answer: "Comprehensive crop insurance covers weather risks. Polyhouse protection + diversified locations across Darjeeling reduce risk to near zero."
              },
              {
                concern: "\"How do I know you'll actually grow berries?\"", 
                answer: "GPS-mapped plot allocation with real coordinates. Live farm visits included. IoT monitoring sends real-time updates to your phone."
              },
              {
                concern: "\"₹3 lakh is too much upfront investment.\"",
                answer: "Start with ₹10,000 daily SIP! Gradual investment builds your berry empire. No pressure, completely flexible scaling."
              },
              {
                concern: "\"What if market prices crash?\"",
                answer: "Bryan Johnson effect + health trends ensure premium demand. Export markets + processing into jams/juices provide price stability."
              }
            ].map((item, index) => (
              <Card key={index} className="border-l-4 border-l-amber-400">
                <CardHeader>
                  <CardTitle className="text-amber-700 text-lg">{item.concern}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 font-medium">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Reviews Section */}
      <section className="container mx-auto px-4 py-16 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594681863434-9e0c11e59ebb?q=80&w=2940')] bg-cover bg-center opacity-5"></div>
        <div className="relative">
          <h2 className="text-4xl font-bold text-center mb-4">Blueberry Farming Success Stories</h2>
          <p className="text-center text-gray-600 mb-12">Real success stories from established blueberry farmers across India</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              name: "Keya Salot",
              location: "Farm2Fam, Maharashtra", 
              rating: 5,
              review: "Growing blueberries under high tunnels yields more fruit and extends harvest to 4-5 months. We're now producing 135 tonnes annually on 20 acres, supplying Swiggy, Zepto, Star Bazaar, and Reliance Retail.",
              source: "The Better India, 2024",
              sourceUrl: "https://thebetterindia.com/345037/growing-blueberries-raspberries-in-india-lawyer-quits-start-farm2fam-low-cost-tunnel-method/"
            },
            {
              name: "Industry Report", 
              location: "All India Analysis",
              rating: 5,
              review: "Blueberry imports into India grew from almost zero in 2009 to 1,900 tonnes in 2020. Well-managed farms achieve ₹2-10 lakhs profit per acre annually with berries fetching ₹1000/kg.",
              source: "Asia Farming, 2024",
              sourceUrl: "https://www.asiafarming.com/how-to-start-blueberry-farming-in-india-varieties-yield-cost-and-profit-per-acre"
            },
            {
              name: "Market Analysis",
              location: "Pan-India Study", 
              rating: 5,
              review: "Berry imports surged 148% to 870 tonnes in 2022. Each acre with 3000 plants producing 2kg per plant generates substantial profits at current market rates of ₹1000/kg.",
              source: "Agri Farming Guide, 2024",
              sourceUrl: "https://www.agrifarming.in/blueberry-farming"
            }
          ].map((review, index) => (
            <Card key={index} className="border-2 border-green-100">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">{review.name}</CardTitle>
                <CardDescription>{review.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">"{review.review}"</p>
                <a 
                  href={review.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Badge variant="outline" className="text-blue-600 border-blue-600 text-xs hover:bg-blue-50 transition-colors cursor-pointer">
                    Source: {review.source} ↗
                  </Badge>
                </a>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </section>

      {/* 2 Payment Plans */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4">Choose Your Berry Investment Plan</h2>
          <p className="text-center text-gray-600 mb-8 lg:mb-12 text-base lg:text-lg px-4">Both plans include complete setup, management, and very good returns</p>
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Option 1: Daily SIP on Own Land */}
            <Card className={`border-2 transition-all cursor-pointer hover:shadow-lg ${selectedPlan === 'dailySIP' ? 'border-green-500 ring-2 ring-green-200 shadow-lg' : 'border-gray-200'}`}
                  onClick={() => setSelectedPlan('dailySIP')}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-green-600">₹9,999 Daily SIP</CardTitle>
                    <CardDescription className="text-sm sm:text-base">Grow on your own land • 90 plants/month</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 self-start">YOUR LAND</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>₹9,999 daily investment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>90 blueberry plants per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>₹3 lakh monthly investment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Complete setup & management included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>We earn 10% of sales of blueberry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>You relax and earn passively tax free income</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Land appreciation benefits to you</span>
                  </div>
                </div>
                {/* Benefits Snapshot Graph */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3">Benefits Snapshot</h4>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-lg font-bold text-green-600">90%</div>
                      <div className="text-xs text-gray-600">Your Share</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-lg font-bold text-blue-600">₹37.5L</div>
                      <div className="text-xs text-gray-600">Annual Returns</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div className="text-lg font-bold text-purple-600">0%</div>
                      <div className="text-xs text-gray-600">Tax Rate</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-700">
                    <strong>Annual Plants:</strong> 1,080 plants<br />
                    <strong>Your Investment:</strong> ₹36 lakhs/year<br />
                    <strong>Land Required:</strong> ~0.5 acres/year
                  </div>
                </div>
                
                {/* Subscription Tiers */}
                <div className="mt-4 space-y-3">
                  <h4 className="font-semibold text-green-800">Choose Subscription Duration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSubscriptionTier('1year')}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        subscriptionTier === '1year' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <div className="font-semibold text-green-600">1 Year</div>
                      <div className="text-sm line-through text-gray-500">₹19,999/-</div>
                      <div className="text-lg font-bold text-green-600">₹9,999/-</div>
                      <div className="text-xs text-gray-600">Annual Membership</div>
                    </button>
                    <button
                      onClick={() => setSubscriptionTier('2year')}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        subscriptionTier === '2year' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                    >
                      <div className="font-semibold text-green-600">2 Years</div>
                      <div className="text-sm line-through text-gray-500">₹39,998/-</div>
                      <div className="text-lg font-bold text-green-600">₹18,999/-</div>
                      <div className="text-xs text-gray-600">Best Value</div>
                    </button>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Setting up...' : `Start Daily SIP - ₹${subscriptionTier === '1year' ? '9,999' : '18,999'} (Cashfree UPI)`}
                  </button>
                  <div className="text-xs text-gray-500 text-center">
                    Secure payment via Cashfree • UPI Subscription • Cancel anytime
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Option 2: Land + Blueberry Investment */}
            <Card className={`border-2 transition-all cursor-pointer hover:shadow-lg ${selectedPlan === 'lumpsum3L' ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' : 'border-gray-200'}`}
                  onClick={() => setSelectedPlan('lumpsum3L')}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl text-blue-600">Land + Blueberry Package</CardTitle>
                    <CardDescription className="text-sm sm:text-base">We provide land • Ambari location</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-blue-500 text-blue-600 self-start">LAND INCLUDED</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>10 acres freehold land in Ambari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>25,000 blueberry plants (2,500/acre)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Total investment: ₹13 crores</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Divisible into 0.5 acre plots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>₹65 lakhs per 0.5 acre plot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Complete managed farming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600" />
                    <span>Build retirement home from revenue</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700">
                    <strong>Location:</strong> Ambari, T-state land<br />
                    <strong>Minimum:</strong> 0.5 acre (₹65 lakhs)<br />
                    <strong>Payment:</strong> Lumpsum investment<br />
                    <strong>Bonus:</strong> Revenue funds retirement home
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Production Timeline Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Your Blueberry Production Journey</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle>Monthly Production Growth (90 plants/month)</CardTitle>
                <CardDescription>See how your investment grows over 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={productionData}>
                      <defs>
                        <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis label={{ value: 'Yield (kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value: any, name: any) => {
                          if (name === 'yield') return [`${value} kg`, 'Yield'];
                          return [value, name];
                        }}
                      />
                      <Area type="monotone" dataKey="yield" stroke="#3b82f6" fillOpacity={1} fill="url(#colorYield)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {productionData.map((item, index) => (
                    <div key={index} className="text-center p-3 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-gray-700">{item.year}</div>
                      <div className="text-2xl font-bold text-blue-600">{item.yield} kg</div>
                      <div className="text-sm text-gray-600">{item.stage}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Customer Details Collection */}
      <section className="container mx-auto px-4 py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Berry Empire?</h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-6 px-4">
              Join thousands of investors earning passive tax-free income through blueberry farming
            </p>
          </div>
          
          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">Get Started - Fill Your Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) => setCustomerData({...customerData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={customerData.phone}
                  onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={customerData.location}
                  onChange={(e) => setCustomerData({...customerData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="City, State"
                />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl mb-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">₹9,999/day</div>
                  <div className="text-sm text-gray-600">90 plants/month • Your land</div>
                </div>
                <div className="text-xl lg:text-2xl text-gray-400">OR</div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">₹65 Lakh</div>
                  <div className="text-sm text-gray-600">0.5 acre + 1250 plants</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleWhatsAppConsultation}
                size="lg" 
                variant="outline"
                className="flex-1 border-green-500 text-green-600 hover:bg-green-50 px-6 py-4 text-base lg:text-lg font-semibold rounded-lg transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp Consultation
              </Button>
              
              {selectedPlan === 'dailySIP' && (
                <Button 
                  onClick={handlePayment}
                  disabled={loading || !customerData.name || !customerData.email || !customerData.phone}
                  size="lg" 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 text-base lg:text-lg font-semibold rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Setting up...' : 'Start Cashfree UPI Subscription'}
                </Button>
              )}
            </div>
            
            <p className="text-gray-500 mt-4 text-sm text-center">
              💬 Get instant responses • 📍 Location analysis • 💰 Investment guidance • 🔒 Secure payments
            </p>
          </div>
        </div>
      </section>

      {/* 1 Free Consultation (CTA) */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Get Your FREE Berry Farm Consultation</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Speak with our Darjberry experts via WhatsApp. Get personalized advice on land suitability, 
            investment planning, and expected returns. No pressure, just pure berry wisdom! 🫐
          </p>
          
          <Button 
            onClick={() => {
              const message = `Hi Darjberry! 🫐

I'm interested in growing berries and earning passive tax-free income.

💰 Investment Interest: Both ₹9,999 Daily SIP (90 plants/month) & Land+Blueberry Package options

I'd like to know more about:
- Setup process on my land or Himalayas  
- Expected returns with complete management
- Option 1: Your land + our expertise (10% on sales)
- Option 2: Ambari land + complete setup
- Capital protection details
- How Darjberry handles everything
- Location analysis for my area

Ready to be part of India's Amul for Berries! 🌱

Please guide me through the next steps.`;
              
              const encodedMessage = encodeURIComponent(message);
              window.open(`https://wa.me/917047474942?text=${encodedMessage}`, '_blank');
            }}
            size="lg" 
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Phone className="mr-3 h-6 w-6" />
            Start FREE WhatsApp Consultation
          </Button>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Darjeeling, West Bengal</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Capital Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>Tax-Free Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Offer Reinforcement Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4 text-green-400">
            🫐 Grow berries on your land or in the Himalayas, earn passive tax-free income 🫐
          </h3>
          <p className="text-gray-300 mb-4">
            Be part of India's Amul for Berries • We take care of setup, growing, selling • Capital protected business
          </p>
          
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://instagram.com/darjberry" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-pink-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://wa.me/917047474942" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-green-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="https://facebook.com/darjberry" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-blue-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
