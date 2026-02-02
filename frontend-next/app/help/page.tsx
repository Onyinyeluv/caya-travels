export default function HelpPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I search for programs or travel packages?',
          a: 'Use the search bar on the homepage or navigate to the Search page. You can filter by type (Program or Travel) and search by keywords, destination, or institution name.'
        },
        {
          q: 'Do I need an account to browse listings?',
          a: 'No, you can browse all listings without an account. However, you'll need to create an account to apply for programs or book travel packages.'
        },
        {
          q: 'Is the platform free to use?',
          a: 'Yes, browsing and searching is completely free. Some education programs may have application fees, and travel packages have their listed prices.'
        }
      ]
    },
    {
      category: 'Education Programs',
      questions: [
        {
          q: 'How do I apply for an education program?',
          a: 'Click on any program listing to view full details. Click the "Apply Now" button and follow the application process. You'll need to provide required documents and pay any applicable application fees.'
        },
        {
          q: 'How long does the application process take?',
          a: 'Processing times vary by institution. Most programs respond within 2-4 weeks. You'll receive updates via email and can track your application status in your profile.'
        },
        {
          q: 'What documents do I need?',
          a: 'Requirements vary by program but typically include transcripts, English proficiency test scores, letters of recommendation, and a personal statement. Check each program's specific requirements.'
        }
      ]
    },
    {
      category: 'Travel Bookings',
      questions: [
        {
          q: 'How do I book a travel package?',
          a: 'Select your desired travel package, choose your dates, and proceed to checkout. Payment is processed securely through Stripe.'
        },
        {
          q: 'Can I cancel or modify my booking?',
          a: 'Cancellation policies vary by package. You can view and manage your bookings from your profile. Some bookings may be eligible for refunds or modifications.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment integration.'
        }
      ]
    },
    {
      category: 'For Partners',
      questions: [
        {
          q: 'How do I become a partner?',
          a: 'Visit the Partner Onboarding page, fill out the registration form, and submit required verification documents. Our team will review your application and approve qualified partners.'
        },
        {
          q: 'What are the fees for partners?',
          a: 'We charge a small commission on successful bookings and applications. Contact our partnerships team for detailed pricing information.'
        },
        {
          q: 'How do I manage my listings?',
          a: 'Once approved, access your Partner Dashboard to create, edit, and manage your listings, track applications, and view analytics.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-gray-600 text-lg mb-12">
          Find answers to common questions or contact our support team for personalized assistance.
        </p>

        <div className="space-y-12">
          {faqs.map((category) => (
            <section key={category.category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-6">
                {category.questions.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 bg-primary/10 p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-700 mb-6">
            Our support team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <a href="/contact" className="btn-primary px-8 py-3">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
