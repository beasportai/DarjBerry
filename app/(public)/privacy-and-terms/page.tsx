import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>These Terms and Conditions govern your use of Moberry&apos;s website and purchase of our products.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Orders and Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All orders are subject to availability.</li>
            <li>Prices are listed in INR and may be subject to taxes and shipping fees.</li>
            <li>Payment must be made in full before order processing.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Shipping and Returns</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>We ship within India. Estimated delivery times will be provided at checkout.</li>
            <li>Returns are accepted within 7 days of delivery for unused products in original packaging.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Use of Website</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to use our website lawfully and refrain from any fraudulent activities.</li>
            <li>We may update product descriptions, prices, and website content without prior notice.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p>Moberry is not liable for any indirect, incidental, or consequential damages related to product use or website access.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
          <p>These terms are governed by the laws of India.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p>We may update these terms from time to time. Continued use of our website constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>For any inquiries, contact us at <a href="mailto:fursatin@gmail.com" className="text-blue-600 hover:underline">fursatin@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  )
}

export default TermsAndConditions;
