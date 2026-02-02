export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Caya Express Travels</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Caya Express Travels is dedicated to connecting students and travelers with world-class 
              education programs and unforgettable travel experiences. We believe that education and 
              cultural exploration are the keys to personal growth and global understanding.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through our platform, we partner with trusted institutions and travel providers worldwide 
              to offer curated opportunities that transform lives and broaden horizons.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Education Programs</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>University degree programs</li>
                  <li>Language courses</li>
                  <li>Professional certifications</li>
                  <li>Study abroad opportunities</li>
                  <li>Application support and guidance</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Travel Packages</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>Cultural tours and experiences</li>
                  <li>Beach and resort packages</li>
                  <li>Adventure travel</li>
                  <li>Business travel solutions</li>
                  <li>Custom itinerary planning</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <div className="bg-primary/10 p-6 rounded-lg">
              <ul className="text-gray-800 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Trusted Partners:</strong> We work only with accredited institutions and verified travel providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Expert Guidance:</strong> Our team provides personalized support throughout your journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Transparent Pricing:</strong> No hidden fees, clear costs from the start</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span><strong>Secure Platform:</strong> Your data and payments are protected with industry-leading security</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Ready to explore your options? Browse our programs and travel packages, or get in touch 
              with our team to discuss your specific goals and needs.
            </p>
            <div className="flex gap-4">
              <a href="/search" className="btn-primary">
                Browse Opportunities
              </a>
              <a href="/contact" className="btn-ghost">
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
