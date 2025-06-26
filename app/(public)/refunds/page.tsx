import React from 'react'
import Link from 'next/link'

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-800 via-purple-700 to-pink-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-xl text-purple-100">Investment protection and refund scenarios</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">1. Refund Eligibility</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Pre-Contract Phase</h4>
                  <p className="text-gray-700"><strong>100% refund</strong> if feasibility analysis shows land unsuitable for blueberry cultivation</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Within 30 Days</h4>
                  <p className="text-gray-700"><strong>90% refund</strong> if MFA not executed due to documentation issues (10% processing fee applies)</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">⚡ Force Majeure</h4>
                  <p className="text-gray-700"><strong>Pro-rata refund</strong> for services not rendered due to natural disasters or government restrictions</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">2. Non-Refundable Scenarios</h3>
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>After plantation establishment:</strong> Once plants are procured and planted on your land</li>
                  <li><strong>Infrastructure installed:</strong> After polyhouse, irrigation, or monitoring systems are set up</li>
                  <li><strong>Services rendered:</strong> Proportional to agronomy services already provided</li>
                  <li><strong>Landowner breach:</strong> If contract terms are violated by the landowner</li>
                  <li><strong>Market fluctuations:</strong> Changes in blueberry market prices do not qualify for refunds</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">3. Refund Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Submit Request</h4>
                    <p className="text-gray-700">Email refund request to darjberry@gmail.com with MFA reference number and detailed reason</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Documentation</h4>
                    <p className="text-gray-700">Provide supporting documents (land papers, payment receipts, correspondence records)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Review Process</h4>
                    <p className="text-gray-700">Darjberry team reviews application within 7 business days</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Processing</h4>
                    <p className="text-gray-700">If approved, refund processed within 15 business days to original payment method</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">4. Performance-Based Remedies</h3>
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Production Shortfall:</strong> If minimum 2kg/plant not achieved by Year 4, Year 5 services provided free (not cash refund)</li>
                  <li><strong>Management Negligence:</strong> Proven negligence leading to crop failure may result in partial refund as per arbitration</li>
                  <li><strong>Infrastructure Failure:</strong> Darjberry covers replacement costs for faulty infrastructure components</li>
                  <li><strong>Quality Issues:</strong> Sub-standard plant material replaced at no cost within first year</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">5. Payment Plan Refunds</h3>
              <p className="text-gray-700 mb-4">For customers on installment plans:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Calculation:</strong> Refunds calculated based on payments made to date</li>
                <li><strong>Future Installments:</strong> Automatically cancelled upon refund approval</li>
                <li><strong>Processing Fee:</strong> 2% of refund amount may apply for administrative costs</li>
                <li><strong>Loan Customers:</strong> Bank loan settlement responsibility remains with customer</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Exclusions</h3>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="text-gray-700 mb-4">Refunds are NOT applicable for:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Market price fluctuations or demand changes</li>
                  <li>Changes in government policies after contract signing</li>
                  <li>Landowner's change of mind or financial circumstances</li>
                  <li>Natural variations in plant productivity within acceptable ranges</li>
                  <li>Seasonal variations in yield or harvest timing</li>
                  <li>Competition from other agricultural ventures</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">7. Insurance Coverage</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>PMFBY Insurance:</strong> Optional crop insurance available at 5% premium covers natural calamities</li>
                <li><strong>Coverage Scope:</strong> Drought, flood, cyclone, hailstorm, pest attacks covered under insurance</li>
                <li><strong>Claim Process:</strong> Insurance claims processed directly with PMFBY, not through Darjberry</li>
                <li><strong>Complementary Protection:</strong> Insurance supplements but doesn't replace our refund policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">8. Dispute Resolution for Refunds</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Internal Review:</strong> All refund denials can be appealed within 30 days</li>
                <li><strong>Independent Assessment:</strong> Third-party agricultural expert evaluation for disputed cases</li>
                <li><strong>Mediation:</strong> Neutral mediation available before arbitration proceedings</li>
                <li><strong>Timeline:</strong> Complete dispute resolution within 90 days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">9. Refund Timeline</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-3 text-left">Scenario</th>
                      <th className="border p-3 text-left">Processing Time</th>
                      <th className="border p-3 text-left">Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-3">Land Unsuitable</td>
                      <td className="border p-3">7-10 days</td>
                      <td className="border p-3">100%</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Documentation Issues</td>
                      <td className="border p-3">10-15 days</td>
                      <td className="border p-3">90%</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Force Majeure</td>
                      <td className="border p-3">15-30 days</td>
                      <td className="border p-3">Pro-rata</td>
                    </tr>
                    <tr>
                      <td className="border p-3">Disputed Cases</td>
                      <td className="border p-3">30-90 days</td>
                      <td className="border p-3">As determined</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">10. Contact for Refunds</h3>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                <p className="text-gray-700 mb-4"><strong>For refund queries and requests:</strong></p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-purple-800">Primary Contact</p>
                    <p className="text-gray-700">Email: darjberry@gmail.com</p>
                    <p className="text-gray-700">Subject: "Refund Request - [Your MFA Number]"</p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-800">Phone Support</p>
                    <p className="text-gray-700">Phone: +91 7047 474 942</p>
                    <p className="text-gray-700">WhatsApp: +91 7047 474 942</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-semibold text-purple-800">Office Hours</p>
                  <p className="text-gray-700">Monday-Saturday: 9:00 AM - 6:00 PM IST</p>
                  <p className="text-gray-700">Sunday: Emergency cases only</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">11. Policy Updates</h3>
              <p className="text-gray-700">
                This refund policy may be updated to reflect changes in business practices or regulatory requirements. 
                All active MFA holders will be notified of material changes via email and WhatsApp. 
                The policy version in effect at the time of your MFA signing will govern your agreement.
              </p>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privacy" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Terms & Conditions</Link>
            <Link href="/" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">Back to Home</Link>
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

export default RefundPolicy