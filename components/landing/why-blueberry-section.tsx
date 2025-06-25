"use client";

import { SectionTitle } from "./section-title";

export const WhyBlueberrySection: React.FC = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Why Blueberries? The Longevity Superfruit"
          subtitle={
            <>
              <a href="https://protocol.bryanjohnson.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">
                Bryan Johnson, world's leading longevity practitioner
              </a>
              , includes blueberries as a key component in his Blueprint diet protocol
            </>
          }
        />
        
        {/* Clean Bento Grid Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 lg:gap-8">
            
            {/* Large Video Card - Spans 3 columns, 2 rows */}
            <div className="lg:col-span-3 lg:row-span-2">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-2xl h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Blueprint Protocol Evidence
                </h3>
                
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black mb-6">
                  <iframe
                    src="https://www.youtube.com/embed/8eb_41ZpyOQ?autoplay=1&mute=0&rel=0&modestbranding=1&loop=1&playlist=8eb_41ZpyOQ&volume=50"
                    title="Bryan Johnson Blueprint Diet - Blueberries for Longevity"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                <p className="text-purple-100 leading-relaxed text-lg">
                  <a href="https://protocol.bryanjohnson.com/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-purple-200">
                    Johnson's $2M annual protocol
                  </a> includes blueberries in his daily "Nutty Pudding" and Blueberry Nut Mix - evidence-based nutrition for biological age reversal.
                </p>
              </div>
            </div>

            {/* Top Right - 2x2 Stats Grid */}
            <div className="lg:col-span-3 grid grid-cols-2 gap-4 lg:gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  <a href="https://www.healthline.com/nutrition/10-proven-benefits-of-blueberries" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
                    10x
                  </a>
                </div>
                <div className="text-gray-600 font-medium text-sm">Higher antioxidants</div>
                <div className="text-xs text-gray-500 mt-1">than common fruits</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  <a href="https://www.bigbasket.com/pd/30009286/fresho-blueberry-125-g/" target="_blank" rel="noopener noreferrer" className="hover:text-green-700">
                    ₹500-1200
                  </a>
                </div>
                <div className="text-gray-600 font-medium text-sm">Premium price</div>
                <div className="text-xs text-gray-500 mt-1">per kilogram</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <a href="https://www.imarcgroup.com/india-exotic-vegetables-market" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                    12.3%
                  </a>
                </div>
                <div className="text-gray-600 font-medium text-sm">CAGR growth</div>
                <div className="text-xs text-gray-500 mt-1">exotic fruits India</div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  <a href="https://protocol.bryanjohnson.com/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-700">
                    Blueprint
                  </a>
                </div>
                <div className="text-gray-600 font-medium text-sm">Diet protocol</div>
                <div className="text-xs text-gray-500 mt-1">+ market apps</div>
              </div>
            </div>

            {/* Bottom Row - Large Brain Food Card (3 cols) + Market Applications (3 cols) */}
            <div className="lg:col-span-3 lg:row-span-1">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-3xl mr-3">🧠</span>
                  The Ultimate Brain Food
                </h3>
                <p className="text-blue-100 leading-relaxed text-lg mb-6">
                  <a href="https://www.alzdiscovery.org/cognitive-vitality/ratings/blueberries" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-200">
                    Research shows
                  </a> blueberries improve memory formation within hours and processing speed in 12 weeks. Superior cognitive benefits compared to almonds (161.6k tons consumed in India annually).
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <p className="text-sm font-semibold mb-2">🎯 Cognitive Benefits</p>
                    <p className="text-xs text-blue-100">
                      <a href="https://nutritionfacts.org/blog/one-daily-cup-of-blueberries-found-to-improve-cognition/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-200">
                        One cup improves cognition
                      </a> within hours
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <p className="text-sm font-semibold mb-2">📊 Study Results</p>
                    <p className="text-xs text-blue-100">
                      <a href="https://www.healthline.com/nutrition/10-proven-benefits-of-blueberries" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-blue-200">
                        20% cognitive improvement
                      </a> in 12 weeks
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:row-span-1">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-3xl mr-3">💎</span>
                  Premium Market Applications
                </h3>
                <p className="text-green-100 leading-relaxed text-lg mb-6">
                  Blueberries used in <a href="https://dontwastethecrumbs.com/cheesecake-blueberry-smoothie/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-green-200">cheesecakes & smoothies</a>, premium muesli, and <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC10295438/" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-green-200">skin research applications</a>. <a href="https://www.news-medical.net/news/20230614/Study-reveals-impressive-skin-benefits-of-blueberries.aspx" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-green-200">Medical studies</a> show UV protection and anti-aging benefits.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-4">
                    <p className="text-sm font-semibold mb-2">🍰 Food Industry</p>
                    <p className="text-xs text-green-100">Premium desserts, smoothies, luxury muesli blends</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <p className="text-sm font-semibold mb-2">🧴 Cosmetics</p>
                    <p className="text-xs text-green-100">
                      <a href="https://www.healthline.com/nutrition/blueberry-benefits-for-skin" target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-green-200">
                        Anti-aging skincare
                      </a> products
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Feature Cards - Bottom */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-purple-100 h-full">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                  <span className="text-2xl mr-3">🧬</span>
                  Cellular Optimization
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7442370/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">
                    Anthocyanins research
                  </a> shows blueberries activate longevity pathways and protect DNA from oxidative damage.
                </p>
                <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-800 font-medium">
                    📊 <a href="https://www.healthline.com/nutrition/10-proven-benefits-of-blueberries" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:text-purple-800 underline">
                      13,427 total antioxidants
                    </a> per cup (blueberries)
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};