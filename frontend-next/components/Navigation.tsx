'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import Button from './ui/Button'

export default function Navigation() {
  const [user, setUser] = useState<any>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-gray-900 font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Caya Express</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              <Link href="/search" className="text-gray-700 hover:text-gray-900 font-medium">
                Programs
              </Link>
              <Link href="/search?type=TRAVEL" className="text-gray-700 hover:text-gray-900 font-medium">
                Travel
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                About
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">My Bookings</Button>
                </Link>
                <Link href="/partner/dashboard">
                  <Button variant="ghost" size="sm">Partner Portal</Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signin?mode=signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-4 space-y-3">
            <Link href="/search" className="block text-gray-700 font-medium">
              Programs
            </Link>
            <Link href="/search?type=TRAVEL" className="block text-gray-700 font-medium">
              Travel
            </Link>
            <Link href="/about" className="block text-gray-700 font-medium">
              About
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="block text-gray-700 font-medium">
                  My Bookings
                </Link>
                <Link href="/partner/dashboard" className="block text-gray-700 font-medium">
                  Partner Portal
                </Link>
                <button onClick={handleSignOut} className="block text-gray-700 font-medium">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="block text-gray-700 font-medium">
                  Sign In
                </Link>
                <Link href="/signin?mode=signup" className="block text-primary font-medium">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
