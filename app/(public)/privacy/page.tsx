import React from 'react'
import Link from 'next/link'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-green-100">How we protect and use your information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
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
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">6. Cookies and Analytics</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We use cookies to improve your website experience</li>
                <li>Google Analytics helps us understand user behavior</li>
                <li>ROI calculator data is stored locally in your browser</li>
                <li>You can disable cookies in your browser settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">7. Data Retention</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Personal data retained for the duration of MFA contract (15-20 years)</li>
                <li>Financial records kept for 7 years as per Indian law</li>
                <li>Farm performance data retained permanently for business records</li>
                <li>Marketing data deleted upon opt-out request</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">8. Updates to Privacy Policy</h3>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any material changes via email or WhatsApp. Continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">9. Contact Information</h3>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <p className="text-gray-700">
                  <strong>Fursat Farms Private Limited</strong><br />
                  3rd Floor, Dwarika Heights<br />
                  Near Vega Circle Sevoke Road<br />
                  Siliguri - 734005, West Bengal<br />
                  Phone: +91 7047 474 942<br />
                  Email: darjberry@gmail.com<br />
                  WhatsApp: +91 7047 474 942
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/terms" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Terms & Conditions</Link>
            <Link href="/refunds" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">Refund Policy</Link>
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

export default PrivacyPolicy