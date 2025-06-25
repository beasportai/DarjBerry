import React from 'react'

const PrivacyAndTerms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Information</h1>
          <p className="text-xl text-green-100">Privacy Policy, Terms & Conditions, and Refund Policy</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <a href="#privacy" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Privacy Policy</a>
          <a href="#terms" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Terms & Conditions</a>
          <a href="#refunds" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">Refund Policy</a>
        </div>

        {/* Privacy Policy */}
        <div id="privacy" className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-green-800">Privacy Policy</h2>
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Information We Collect</h3>
                <p className="text-gray-700 mb-4">Fursat Farms Private Limited (operating Darjberry) collects the following information:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Personal Information:</strong> Name, phone number, email address, and land ownership details when you express interest in our managed blueberry farming services</li>
                  <li><strong>Land Information:</strong> Location coordinates, land size, soil reports, and property documents for feasibility analysis</li>
                  <li><strong>Financial Information:</strong> Payment details for processing investments (₹88,00,000 per acre package)</li>
                  <li><strong>Communication Data:</strong> WhatsApp messages, emails, and phone call records for customer service</li>
                  <li><strong>Usage Data:</strong> Website analytics, ROI calculator inputs, and user interactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. How We Use Your Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Conduct feasibility analysis using Google Earth Engine API, ISRIC World Soil Information Service API, and OpenWeatherMap API</li>
                  <li>Process Managed Farming Agreements (MFA) for 15-20 year partnerships</li>
                  <li>Calculate personalized ROI projections and payback periods</li>
                  <li>Manage blueberry cultivation operations and provide quarterly updates</li>
                  <li>Facilitate sales through our B2B network (Zepto, Blinkit, BigBasket, Hyperpure)</li>
                  <li>Process revenue sharing (20% commission on gross sales)</li>
                  <li>Send WhatsApp updates about farm progress and harvest schedules</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Data Protection</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure storage of land documents and financial records</li>
                  <li>Limited access to personal data (authorized personnel only)</li>
                  <li>Regular security audits and updates</li>
                  <li>Compliance with Indian data protection laws</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">4. Data Sharing</h3>
                <p className="text-gray-700 mb-4">We share your information only with:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Agricultural experts and agronomists managing your farm</li>
                  <li>PMFBY crop insurance providers (optional coverage)</li>
                  <li>Sales partners for distribution (anonymized produce data)</li>
                  <li>Government authorities as required by law</li>
                  <li>Payment processors for investment transactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">5. Your Rights</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Access your personal data and farm performance reports</li>
                  <li>Request corrections to your information</li>
                  <li>Receive copies of your MFA and financial records</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data deletion (subject to legal obligations)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Contact Information</h3>
                <p className="text-gray-700">
                  Fursat Farms Private Limited<br />
                  3rd Floor, Dwarika Heights<br />
                  Near Vega Circle Sevoke Road<br />
                  Siliguri - 734005<br />
                  Phone: +91 7047 474 942<br />
                  Email: darjberry@gmail.com
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div id="terms" className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-blue-800">Terms & Conditions</h2>
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
                <table className="w-full border-collapse mb-6">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Year</th>
                      <th className="border p-3 text-left">Yield per Plant</th>
                      <th className="border p-3 text-left">Total for 1 Acre</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Year 1</td>
                      <td className="border p-3">0.5 kg</td>
                      <td className="border p-3">1,100 kg</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Year 2</td>
                      <td className="border p-3">1 kg</td>
                      <td className="border p-3">2,200 kg</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Year 3</td>
                      <td className="border p-3">2 kg</td>
                      <td className="border p-3">4,400 kg</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Year 4-20</td>
                      <td className="border p-3">3 kg</td>
                      <td className="border p-3">6,600 kg</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">4. Revenue Sharing</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Darjberry charges 20% commission on gross revenue from blueberry sales</li>
                  <li>Landowner receives 80% of gross revenue</li>
                  <li>All agricultural income is tax-free under Section 10(1) of Income Tax Act, 1961</li>
                  <li>Quarterly revenue settlements via bank transfer</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">5. Landowner Obligations</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Provide clear title deed and necessary land documents</li>
                  <li>Ensure uninterrupted land access for 15-20 years</li>
                  <li>Cooperate with feasibility assessments and farm operations</li>
                  <li>Maintain confidentiality of proprietary farming techniques</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Performance Guarantee</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Minimum 2kg per plant production by Year 4</li>
                  <li>If target not met, Year 5 management services provided free</li>
                  <li>135MT production track record by our agronomists</li>
                  <li>Optional PMFBY crop insurance available at 5% premium</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">7. Termination</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>MFA is binding for the full contract period</li>
                  <li>Early termination allowed only in case of force majeure</li>
                  <li>Infrastructure remains property of Darjberry</li>
                  <li>Plants ownership transfers to landowner after contract completion</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">8. Dispute Resolution</h3>
                <p className="text-gray-700">
                  Any disputes shall be resolved through arbitration in Siliguri, West Bengal, under the Arbitration and Conciliation Act, 1996.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Refund Policy */}
        <div id="refunds" className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-purple-800">Refund Policy</h2>
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Refund Eligibility</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Pre-Contract Phase:</strong> 100% refund if feasibility analysis shows land unsuitable for blueberry cultivation</li>
                  <li><strong>Within 30 Days:</strong> 90% refund if MFA not executed due to documentation issues</li>
                  <li><strong>Force Majeure:</strong> Pro-rata refund for services not rendered due to natural disasters or government restrictions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Non-Refundable Scenarios</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>After plantation establishment (plants procured and planted)</li>
                  <li>Infrastructure already installed on land</li>
                  <li>Services already rendered (pro-rata basis)</li>
                  <li>Landowner breach of contract</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Refund Process</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Submit refund request via email to darjberry@gmail.com</li>
                  <li>Include MFA reference number and reason for refund</li>
                  <li>Darjberry team reviews within 7 business days</li>
                  <li>If approved, refund processed within 15 business days</li>
                  <li>Refunds made to original payment method</li>
                </ol>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">4. Performance-Based Refunds</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>If minimum 2kg/plant not achieved by Year 4, Year 5 services free (not cash refund)</li>
                  <li>Crop failure due to proven management negligence: Partial refund as per arbitration</li>
                  <li>Market price guarantee not applicable - refunds not provided for price fluctuations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">5. Payment Plans</h3>
                <p className="text-gray-700 mb-4">For customers on installment plans:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Refunds calculated based on payments made to date</li>
                  <li>Future installments automatically cancelled</li>
                  <li>Processing fee of 2% may apply</li>
                </ul>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Contact for Refunds</h3>
                <p className="text-gray-700">
                  For refund queries, contact:<br />
                  Email: darjberry@gmail.com<br />
                  Phone: +91 7047 474 942<br />
                  WhatsApp: +91 7047 474 942<br />
                  Office Hours: Monday-Saturday, 9 AM - 6 PM IST
                </p>
              </section>
            </div>
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

export default PrivacyAndTerms