import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-white">Caya Express</span>
            </div>
            <p className="text-sm text-gray-400">
              Your trusted partner for education programs and travel experiences worldwide.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-primary transition-colors">Education Programs</Link></li>
              <li><Link href="/search?type=TRAVEL" className="hover:text-primary transition-colors">Travel Packages</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">For Partners</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner/onboard" className="hover:text-primary transition-colors">Become a Partner</Link></li>
              <li><Link href="/partner/dashboard" className="hover:text-primary transition-colors">Partner Portal</Link></li>
              <li><Link href="/partner/students" className="hover:text-primary transition-colors">Manage Students</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Caya Express Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
