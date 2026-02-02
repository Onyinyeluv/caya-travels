export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: November 24, 2025</p>

        <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Caya Express Travels ("the Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Services</h2>
            <p className="text-gray-700 mb-4">
              Our Platform connects users with education programs and travel packages offered by third-party partners. We act as an intermediary and marketplace facilitator.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You must be at least 18 years old to create an account</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You will not use the Platform for any unlawful purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Bookings and Applications</h2>
            <p className="text-gray-700 mb-4">
              When you book a travel package or apply for an education program:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>You enter into a contract with the service provider, not Caya Express</li>
              <li>All bookings are subject to availability and provider confirmation</li>
              <li>Cancellation and refund policies vary by provider</li>
              <li>Application fees are typically non-refundable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Payments</h2>
            <p className="text-gray-700 mb-4">
              Payments are processed securely through Stripe. By making a payment, you agree to Stripe's terms of service. All prices are listed in USD unless otherwise specified.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partner Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              Partners listing services on our Platform must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Provide accurate and up-to-date information about their offerings</li>
              <li>Honor all confirmed bookings and applications</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Maintain appropriate licenses and accreditations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              Caya Express Travels acts as a marketplace platform. We are not responsible for the actions, quality, or safety of services provided by third-party partners. Our liability is limited to the maximum extent permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Modifications</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
            <p className="text-gray-700">
              For questions about these terms, please contact us at legal@cayaexpress.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
