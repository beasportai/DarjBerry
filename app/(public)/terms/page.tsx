import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-xl text-blue-100">Managed Blueberry Farming Agreement Terms</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Service Overview</h3>
              <p className="text-gray-700 mb-4">Darjberry provides managed blueberry farming services including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Complete infrastructure setup (climate-controlled polyhouse, drip irrigation, fogger system)</li>
                <li>15 years of expert agronomy services</li>
                <li>Sales and marketing services (20% commission on gross revenue)</li>
                <li>Minimum production guarantee (2kg per plant by Year 4)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Investment Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Minimum Investment:</strong> 1 acre (₹88,00,000 for 2,200 plants)</li>
                <li><strong>Cost Per Plant:</strong> ₹4,000 including all services</li>
                <li><strong>Contract Duration:</strong> 15-20 years via Managed Farming Agreement (MFA)</li>
                <li><strong>Expected ROI:</strong> 500% over 15 years (projections based on ₹800/kg market price)</li>
                <li><strong>Payback Period:</strong> Approximately 3.5 years</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Production Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Year</th>
                      <th className="border p-3 text-left">Yield per Plant</th>
                      <th className="border p-3 text-left">Total for 1 Acre</th>
                      <th className="border p-3 text-left">Revenue (₹800/kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Year 1</td>
                      <td className="border p-3">0.5 kg</td>
                      <td className="border p-3">1,100 kg</td>
                      <td className="border p-3">₹8,80,000</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Year 2</td>
                      <td className="border p-3">1 kg</td>
                      <td className="border p-3">2,200 kg</td>
                      <td className="border p-3">₹17,60,000</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Year 3</td>
                      <td className="border p-3">2 kg</td>
                      <td className="border p-3">4,400 kg</td>
                      <td className="border p-3">₹35,20,000</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border p-3 font-semibold">Year 4-20</td>
                      <td className="border p-3 font-semibold">3 kg</td>
                      <td className="border p-3 font-semibold">6,600 kg</td>
                      <td className="border p-3 font-semibold">₹52,80,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">4. Revenue Sharing</h3>
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 mb-4">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Darjberry Commission:</strong> 20% of gross revenue from blueberry sales</li>
                  <li><strong>Landowner Share:</strong> 80% of gross revenue</li>
                  <li><strong>Tax Benefits:</strong> All agricultural income is tax-free under Section 10(1) of Income Tax Act, 1961</li>
                  <li><strong>Payment Schedule:</strong> Quarterly revenue settlements via bank transfer</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">5. Landowner Obligations</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide clear title deed and necessary land documents</li>
                <li>Ensure uninterrupted land access for 15-20 years</li>
                <li>Cooperate with feasibility assessments and farm operations</li>
                <li>Maintain confidentiality of proprietary farming techniques</li>
                <li>Allow installation of monitoring equipment and infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Darjberry Obligations</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Complete infrastructure setup within 6 months of MFA signing</li>
                <li>Plant healthy, disease-free blueberry plants (1.5+ years old)</li>
                <li>Provide expert agronomy services for full contract duration</li>
                <li>Maintain plants and infrastructure in optimal condition</li>
                <li>Handle all marketing and sales through established B2B networks</li>
                <li>Provide quarterly progress reports and annual financial statements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">7. Performance Guarantee</h3>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Production Target:</strong> Minimum 2kg per plant by Year 4</li>
                  <li><strong>Remedy:</strong> If target not met, Year 5 management services provided free</li>
                  <li><strong>Track Record:</strong> 135MT production achieved by our agronomists</li>
                  <li><strong>Insurance:</strong> Optional PMFBY crop insurance available at 5% premium</li>
                  <li><strong>Monitoring:</strong> 24/7 farm monitoring and IoT sensors</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">8. Risk Management</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Climate Protection:</strong> Polyhouse infrastructure protects against adverse weather</li>
                <li><strong>Pest Control:</strong> Integrated pest management by certified agronomists</li>
                <li><strong>Disease Prevention:</strong> Regular health monitoring and preventive treatments</li>
                <li><strong>Market Risk:</strong> Diversified sales channels (B2B, D2C, institutional buyers)</li>
                <li><strong>Quality Assurance:</strong> Adherence to international quality standards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">9. Payment Terms</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>One-time Payment:</strong> Full amount due within 30 days of MFA signing</li>
                <li><strong>Installment Option:</strong> 50% upfront, balance in 6 monthly installments</li>
                <li><strong>Agricultural Loan:</strong> We assist with bank loan applications (subject to approval)</li>
                <li><strong>Late Payment:</strong> 2% monthly interest on overdue amounts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">10. Intellectual Property</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All farming techniques and processes remain Darjberry's intellectual property</li>
                <li>Landowner cannot replicate or share proprietary methods</li>
                <li>Infrastructure design and IoT systems are confidential</li>
                <li>Non-disclosure agreement binding throughout contract period</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">11. Termination</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Contract Duration:</strong> MFA is binding for the full 15-20 year period</li>
                <li><strong>Early Termination:</strong> Allowed only in case of force majeure events</li>
                <li><strong>Infrastructure:</strong> Remains Darjberry property during contract period</li>
                <li><strong>Plant Ownership:</strong> Transfers to landowner after contract completion</li>
                <li><strong>Breach of Contract:</strong> May result in termination and penalty charges</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">12. Force Majeure</h3>
              <p className="text-gray-700 mb-4">Neither party shall be liable for delays or failures due to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Natural disasters, floods, droughts, or extreme weather events</li>
                <li>Government regulations or policy changes affecting agriculture</li>
                <li>War, terrorism, or civil unrest</li>
                <li>Pandemic or health emergencies declared by authorities</li>
                <li>Acts of God beyond reasonable control of either party</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">13. Dispute Resolution</h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Negotiation:</strong> First attempt resolution through direct negotiation</li>
                  <li><strong>Mediation:</strong> If negotiation fails, mediation by neutral third party</li>
                  <li><strong>Arbitration:</strong> Final disputes resolved through arbitration in Siliguri, West Bengal</li>
                  <li><strong>Governing Law:</strong> Indian laws and Arbitration and Conciliation Act, 1996</li>
                  <li><strong>Jurisdiction:</strong> Courts in Siliguri, West Bengal have exclusive jurisdiction</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">14. Amendments</h3>
              <p className="text-gray-700">
                These terms may be updated from time to time. Material changes will be communicated via email and WhatsApp. 
                Continued participation in the program constitutes acceptance of updated terms.
              </p>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/privacy" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Privacy Policy</a>
            <a href="/refunds" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">Refund Policy</a>
            <a href="/" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">Back to Home</a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 mt-12">
          <p className="mb-2">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <p>© 2024 Fursat Farms Private Limited. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions