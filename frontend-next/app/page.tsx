'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import featuredListings from '../data/fixtures'
import Hero from '../components/Hero'
import ListingCard from '../components/ListingCard'
import SearchBar from '../components/SearchBar'

export default function Page() {
  const [stats, setStats] = useState({ programs: 0, destinations: 0, partners: 0 })

  useEffect(() => {
    // In production, fetch from API
    setStats({ programs: 150, destinations: 45, partners: 80 })
  }, [])

  return (
    <div>
      <Hero />

      {/* Search Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
            Find Your Perfect Opportunity
          </h2>
          <SearchBar />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{stats.programs}+</div>
              <div className="text-gray-600 font-medium">Education Programs</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{stats.destinations}+</div>
              <div className="text-gray-600 font-medium">Global Destinations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">{stats.partners}+</div>
              <div className="text-gray-600 font-medium">Trusted Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Opportunities</h2>
          <Link href="/search" className="text-primary font-semibold hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Compare</h3>
              <p className="text-gray-600">
                Browse our curated selection of education programs and travel packages from trusted partners worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Apply or Book</h3>
              <p className="text-gray-600">
                Submit your application for education programs or instantly book your travel package with secure payment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Start Your Journey</h3>
              <p className="text-gray-600">
                Get support every step of the way as you embark on your educational or travel adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/20 to-primary/10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of students and travelers who've discovered their path with Caya Express.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search" className="btn-primary px-8 py-3">
              Browse Opportunities
            </Link>
            <Link href="/partner/onboard" className="btn-ghost px-8 py-3">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
