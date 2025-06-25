import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MapPin, Phone, Users, TrendingUp, Shield, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tea Estate Partnership - Convert Your Tea Garden to Profitable Blueberry Farm | Darjberry',
  description: 'Transform your tea estate into a high-yield blueberry farm. Sub-lease, joint venture, or sell your freehold land. 20-35% ROI with tax-free agricultural income.',
  keywords: 'tea estate partnership, blueberry farming, agricultural investment, North Bengal, Darjeeling, Assam tea gardens, land conversion, joint venture',
}

export default function TeaEstatePartnership() {
  const whatsappMessage = encodeURIComponent(
    "Hi Darjberry! I'm a tea estate owner interested in partnership opportunities. I'd like to explore converting my tea garden to blueberry farming."
  )
  
  const whatsappUrl = `https://wa.me/917047474942?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Tea Estate Into a 
            <span className="text-blue-600"> Blueberry Goldmine</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Convert your tea garden into a premium blueberry farm with 20-35% ROI. 
            Perfect soil synergy, government subsidies, and guaranteed buyback.
          </p>
          
          <div className="text-center mb-12">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Phone className="mr-2 h-5 w-5" />
                Start Partnership Discussion
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center">
              <CardHeader className="flex flex-col items-center">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-xl">Perfect Location Match</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tea estates have ideal pH 4.5-5.5 soil conditions that blueberries love</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="flex flex-col items-center">
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-xl">6x Higher Profits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">₹6-8L per acre vs ₹1-1.5L from tea. Same infrastructure, better returns</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader className="flex flex-col items-center">
                <Shield className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-xl">100% Tax-Free Income</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Agricultural income completely exempt under Section 10(1)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 5 Reasons for Tea Estate Conversion */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">5 Reasons Tea Estate Owners Choose Blueberry Conversion</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Revenue Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Revenue per Acre (₹ Lakhs)</CardTitle>
                <CardDescription>5-Year projection comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Year 1 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">Year 1</span>
                    <div className="flex-1 mx-4">
                      <div className="flex">
                        <div className="bg-green-200 h-6 flex items-center justify-center text-xs font-medium" style={{width: '15%'}}>
                          Tea: 1.2L
                        </div>
                        <div className="bg-blue-200 h-6 flex items-center justify-center text-xs font-medium" style={{width: '5%'}}>
                          Berry: 0L
                        </div>
                        <div className="bg-gray-100 h-6" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Year 2 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">Year 2</span>
                    <div className="flex-1 mx-4">
                      <div className="flex">
                        <div className="bg-green-300 h-6 flex items-center justify-center text-xs font-medium" style={{width: '18%'}}>
                          Tea: 1.5L
                        </div>
                        <div className="bg-blue-300 h-6 flex items-center justify-center text-xs font-medium" style={{width: '25%'}}>
                          Berry: 2L
                        </div>
                        <div className="bg-gray-100 h-6" style={{width: '57%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Year 3 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">Year 3</span>
                    <div className="flex-1 mx-4">
                      <div className="flex">
                        <div className="bg-green-400 h-6 flex items-center justify-center text-xs font-medium" style={{width: '20%'}}>
                          Tea: 1.8L
                        </div>
                        <div className="bg-blue-500 h-6 flex items-center justify-center text-xs font-medium text-white" style={{width: '60%'}}>
                          Berry: 6L
                        </div>
                        <div className="bg-gray-100 h-6" style={{width: '20%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Year 4 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">Year 4</span>
                    <div className="flex-1 mx-4">
                      <div className="flex">
                        <div className="bg-green-500 h-6 flex items-center justify-center text-xs font-medium text-white" style={{width: '22%'}}>
                          Tea: 2L
                        </div>
                        <div className="bg-blue-600 h-6 flex items-center justify-center text-xs font-medium text-white" style={{width: '70%'}}>
                          Berry: 7L
                        </div>
                        <div className="bg-gray-100 h-6" style={{width: '8%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Year 5 */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium w-16">Year 5</span>
                    <div className="flex-1 mx-4">
                      <div className="flex">
                        <div className="bg-green-600 h-6 flex items-center justify-center text-xs font-medium text-white" style={{width: '25%'}}>
                          Tea: 2.2L
                        </div>
                        <div className="bg-blue-700 h-6 flex items-center justify-center text-xs font-medium text-white" style={{width: '75%'}}>
                          Berry: 8L
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="inline-block w-3 h-3 bg-green-500 mr-1"></span>Tea Estate
                    <span className="inline-block w-3 h-3 bg-blue-600 ml-4 mr-1"></span>Blueberry Farm
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ROI Progression Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Return on Investment (ROI %)</CardTitle>
                <CardDescription>Cumulative ROI over 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Tea ROI */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Tea Estate ROI</span>
                      <span className="text-sm text-green-600 font-bold">12% (5-year)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-green-500 h-4 rounded-full" style={{width: '12%'}}></div>
                    </div>
                  </div>
                  
                  {/* Blueberry ROI */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Blueberry Farm ROI</span>
                      <span className="text-sm text-blue-600 font-bold">35% (5-year)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-blue-600 h-4 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  
                  {/* Payback Period */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Payback Period Comparison</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tea Estate:</span>
                        <span className="font-medium">8-10 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Blueberry Farm:</span>
                        <span className="font-medium text-blue-600">3-4 years</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Market Price Trends */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Market Price Trends (per kg)</CardTitle>
              <CardDescription>Historical and projected pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">₹150-200</div>
                  <div className="text-sm text-gray-600">Tea Leaves</div>
                  <div className="text-xs text-gray-500 mt-1">Stable pricing</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹900-1000</div>
                  <div className="text-sm text-gray-600">Fresh Blueberries</div>
                  <div className="text-xs text-green-500 mt-1">↗ Growing demand</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">₹1200-1500</div>
                  <div className="text-sm text-gray-600">Export Quality</div>
                  <div className="text-xs text-green-500 mt-1">↗ Premium markets</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Breakdown (Per Acre)</CardTitle>
              <CardDescription>Complete setup cost analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Tea Estate Costs */}
                <div>
                  <h4 className="font-semibold mb-4 text-green-700">Tea Estate Setup</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Land preparation</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹1.2L</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Plants & seeds</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹0.8L</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Infrastructure</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '50%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹1L</span>
                      </div>
                    </div>
                    <div className="border-t pt-2 font-semibold">
                      <div className="flex justify-between">
                        <span>Total Investment</span>
                        <span className="text-green-600">₹3L</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blueberry Costs */}
                <div>
                  <h4 className="font-semibold mb-4 text-blue-700">Blueberry Farm Setup</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Polyhouse structure</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹7L</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Premium plants</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '30%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹3L</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Drip irrigation</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹2L</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Soil preparation</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-sm font-medium">₹2L</span>
                      </div>
                    </div>
                    <div className="border-t pt-2 font-semibold">
                      <div className="flex justify-between">
                        <span>Total Investment</span>
                        <span className="text-blue-600">₹14L</span>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      *50% govt subsidy available
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4 Partnership Concerns Addressed */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">4 Common Tea Estate Owner Concerns Addressed</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                concern: "\"Will existing tea infrastructure be wasted?\"",
                answer: "Tea estate infrastructure is perfectly reusable! Existing drainage, roads, and processing facilities adapt excellently for blueberry operations. Workers retrain easily with higher wages."
              },
              {
                concern: "\"What about my current tea workers and their livelihoods?\"", 
                answer: "We retrain all existing workers in blueberry cultivation. Similar skills, better working conditions, 30-40% higher wages. Your workforce becomes more valuable, not displaced."
              },
              {
                concern: "\"Is the soil really suitable for blueberries?\"",
                answer: "Tea estates maintain perfect pH 4.5-5.5 acidic conditions that blueberries thrive in. Soil analysis included free. Darjeeling climate + tea soil = premium berry quality."
              },
              {
                concern: "\"What if I need my land back or partnership fails?\"",
                answer: "All agreements include exit clauses. Sub-lease terms allow land return. Joint ventures have buyback options. Infrastructure improvements remain with your property."
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

          <h2 className="text-3xl font-bold text-center mb-12">3 Partnership Options for Tea Estate Owners</h2>
          
          <Tabs defaultValue="sublease" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sublease">Sub-Lease</TabsTrigger>
              <TabsTrigger value="jointventure">Joint Venture</TabsTrigger>
              <TabsTrigger value="sale">Direct Sale</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sublease" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Sub-Lease Your Tea Garden</CardTitle>
                  <CardDescription>Lease your land while retaining ownership</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Keep land ownership, earn fixed annual lease income</li>
                    <li>• ₹50,000-₹1,00,000 per acre annually depending on location</li>
                    <li>• 10-20 year lease agreements with renewal options</li>
                    <li>• We handle complete conversion and farming operations</li>
                    <li>• Additional revenue sharing on premium berry sales</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="jointventure" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Joint Venture Partnership</CardTitle>
                  <CardDescription>Share investment and profits together</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• You provide land, we provide capital and expertise</li>
                    <li>• 60:40 profit sharing (60% to you as land owner)</li>
                    <li>• Shared investment in polyhouse and irrigation setup</li>
                    <li>• Joint ownership of assets and produce</li>
                    <li>• Professional farm management included</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="sale" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Land Sale</CardTitle>
                  <CardDescription>Sell your freehold tea estate land</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li>• Premium rates for tea estate land in North Bengal</li>
                    <li>• ₹8-15 lakhs per acre based on location and accessibility</li>
                    <li>• Quick 30-45 day transaction with legal documentation</li>
                    <li>• Option to reinvest as silent partner in the project</li>
                    <li>• Complete legal compliance and title transfer</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* 2 Success Models Explained */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2 Proven Success Models for Tea Estate Conversion</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Model 1: Revenue Sharing */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-xl">Model 1: Revenue Sharing Partnership</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">How It Works</h4>
                    <p className="text-sm text-green-700">You provide land, we provide capital and expertise. Shared revenue model with guaranteed minimum returns.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Land Owner Share</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-3 mr-2">
                          <div className="bg-green-500 h-3 rounded-full" style={{width: '60%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-green-600">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Darjberry Share</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-3 mr-2">
                          <div className="bg-blue-500 h-3 rounded-full" style={{width: '40%'}}></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">40%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      <strong>Example:</strong> 5-acre conversion generates ₹30L annually. 
                      You earn ₹18L, we earn ₹12L for complete management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Model 2: Fixed Lease */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <CardTitle className="text-xl">Model 2: Fixed Annual Lease</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">How It Works</h4>
                    <p className="text-sm text-blue-700">Guaranteed fixed annual payment regardless of production. Predictable income with escalation clauses.</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-2xl font-bold text-blue-600">₹75,000</div>
                      <div className="text-sm text-gray-600">Per acre annually</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg border">
                      <div className="text-lg font-bold text-green-600">5% Annual</div>
                      <div className="text-sm text-gray-600">Escalation clause</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Example:</strong> 10-acre estate earns ₹7.5L annually, 
                      growing to ₹9.6L in year 5. Zero operational risk.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">3 Real Success Stories from Indian Agricultural Diversification</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Tenzing Bodosa - Organic Tea Pioneer */}
            <Card className="border-2 border-green-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Tenzing Bodosa, Assam</h3>
                  <p className="text-gray-600 mb-4 text-sm italic">
                    "If you respect nature, nature will respect you. It is that simple."
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-green-600">₹60-70L</div>
                    <div className="text-sm text-gray-600">Annual turnover from organic tea</div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    World's first elephant-friendly organic tea farmer. Trained 20,000+ farmers in sustainable methods.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Organic Conversion Success
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Small Tea Growers Movement */}
            <Card className="border-2 border-blue-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Small Tea Growers, Assam</h3>
                  <p className="text-gray-600 mb-4 text-sm italic">
                    Government-backed diversification success story
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-blue-600">84,000+</div>
                    <div className="text-sm text-gray-600">Farmers (grew from 657 in 1990)</div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Successful transition from vegetable to tea production with state encouragement and favorable market conditions.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      29 Years Growth
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organic India Scale Impact */}
            <Card className="border-2 border-purple-100">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Organic India Initiative</h3>
                  <p className="text-gray-600 mb-4 text-sm italic">
                    National scale agricultural transformation
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <div className="text-2xl font-bold text-purple-600">500K+</div>
                    <div className="text-sm text-gray-600">Acres converted to organic</div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Sales grew from $500K to $6M in first year. Helped thousands of farmers return to sustainable agriculture.
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      National Scale Success
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>


      {/* 1 Free Tea Estate Analysis (CTA) */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your FREE Tea Estate Conversion Analysis</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            WhatsApp us your tea estate location and get instant analysis on soil suitability, 
            conversion potential, partnership options, and expected returns. Zero commitment, pure expertise! 🫐
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">What You'll Get Instantly:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Soil pH compatibility analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Infrastructure reusability assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Partnership model recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>5-year revenue projections</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Worker transition plan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Government subsidy eligibility</span>
              </div>
            </div>
          </div>
          
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-green-500 hover:bg-green-600 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Phone className="mr-3 h-6 w-6" />
              Start FREE Tea Estate Analysis
            </Button>
          </a>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>North Bengal & Northeast India</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Legal Partnership Framework</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>20-35% ROI Potential</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Worker Transition Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sources & References */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Sources & References</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Success Stories Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Success Story Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Tenzing Bodosa, Assam</p>
                    <p className="text-gray-600">Source: <a href="https://thebetterindia.com/110834/tenzing-bodosa-worlds-first-elephant-friendly-farm-assam/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">The Better India - "Meet Tenzing Bodosa, Assam's First Organic Tea Farmer"</a></p>
                    <p className="text-xs text-gray-500 mt-1">Revenue data: ₹60-70 lakhs yearly turnover, 20,000+ farmers trained</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Joseph Kirimbwa, Uganda</p>
                    <p className="text-gray-600">Source: <a href="https://ksapa.org/brewing-a-better-future-for-coffee-farmers/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">KSAPA - "Brewing a Better Future for Coffee Farmers"</a></p>
                    <p className="text-xs text-gray-500 mt-1">Nespresso AAA Sustainable Quality™ Program participant</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Krishnappa Dasappa Gowda, Karnataka</p>
                    <p className="text-gray-600">Source: <a href="https://naturalfarming.niti.gov.in/farmers-success-stories/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NITI Aayog - Natural Farming Success Stories</a></p>
                    <p className="text-xs text-gray-500 mt-1">Multi-crop natural farming on 5 acres</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Small Tea Growers Movement, Assam</p>
                    <p className="text-gray-600">Source: <a href="https://www.researchgate.net/publication/334670438_Organic_cultivation_and_farm_entrepreneurship_a_case_of_small_tea_growers_in_rural_Assam_India" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ResearchGate - "Organic cultivation and farm entrepreneurship: small tea growers in rural Assam"</a></p>
                    <p className="text-xs text-gray-500 mt-1">Growth from 657 farmers (1990) to 84,000+ (2019)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Research & Data Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Research & Data Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Organic India Scale Data</p>
                    <p className="text-gray-600">Source: <a href="https://purebranding.com/organic-india-tulsi-tea-brand-development-case-study/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pure Branding - "Organic India Case Study"</a></p>
                    <p className="text-xs text-gray-500 mt-1">500,000+ acres organic agriculture, $500K to $6M growth</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Coffee Farmer Diversification</p>
                    <p className="text-gray-600">Source: <a href="https://www.sciencedirect.com/science/article/pii/S1877343524000198" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ScienceDirect - "Which diversification trajectories make coffee farming more sustainable?"</a></p>
                    <p className="text-xs text-gray-500 mt-1">Agroforestry and income diversification strategies</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Agricultural Diversification India</p>
                    <p className="text-gray-600">Source: <a href="https://www.fao.org/4/x6906e/x6906e06.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FAO - "Crop Diversification in India" by C.R. Hazra</a></p>
                    <p className="text-xs text-gray-500 mt-1">Area shifts from cereals to high-value crops analysis</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Digital Transaction Legal Framework</p>
                    <p className="text-gray-600">Source: <a href="https://www.mondaq.com/india/contracts-and-commercial-law/1441750/law-of-digital-signatures-in-india" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mondaq - "Law Of Digital Signatures In India"</a></p>
                    <p className="text-xs text-gray-500 mt-1">Information Technology Act 2000, digital signature regulations</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Escrow Services India</p>
                    <p className="text-gray-600">Source: <a href="https://deepvue.tech/blog/the-impact-of-digital-escrow-account-services-in-indias-digital-first-economy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">DeepVue Tech - "Digital Escrow Services in India"</a></p>
                    <p className="text-xs text-gray-500 mt-1">RBI compliance, legal framework for digital transactions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Government & Industry Reports */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg">Government & Industry Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Joint Development Agreements</p>
                    <p className="text-gray-600">Source: <a href="https://www.99acres.com/articles/all-that-you-need-to-know-about-a-joint-development-agreement.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">99acres - "Joint Development Agreement in Real Estate"</a></p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">NITI Aayog Natural Farming</p>
                    <p className="text-gray-600">Source: <a href="https://naturalfarming.niti.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NITI Aayog - Natural Farming Initiative</a></p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Tea Industry Analysis</p>
                    <p className="text-gray-600">Source: <a href="https://www.ibef.org/exports/indian-tea-industry" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IBEF - "Tea Farming in India"</a></p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Agricultural Innovation</p>
                    <p className="text-gray-600">Source: <a href="https://www.manage.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MANAGE - "Inspiring Stories from Innovative Farmers"</a></p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Global Coffee Research</p>
                    <p className="text-gray-600">Source: <a href="https://worldcoffeeresearch.org/programs/farmer-profitability" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">World Coffee Research - "Farmer Profitability"</a></p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-900">Regenerative Agriculture</p>
                    <p className="text-gray-600">Source: <a href="https://alliancebioversityciat.org/stories/guide-regenerative-coffee-farming" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Alliance Bioversity CIAT - "Regenerative Coffee Farming"</a></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> All testimonials and case studies are sourced from publicly available research, news articles, and government reports. 
              Financial projections for blueberry farming are based on industry analysis and should be verified independently. 
              Past performance does not guarantee future results. Please consult agricultural and financial advisors before making investment decisions.
            </p>
          </div>

          {/* Verification Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              All sources were accessed and verified as of December 2024. Links are provided for independent verification of claims and testimonials.
            </p>
          </div>
        </div>
      </section>


    </div>
  )
}