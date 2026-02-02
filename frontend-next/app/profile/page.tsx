'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'applications' | 'bookings'>('applications')
  
  const supabase = createClientComponentClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const paymentStatus = searchParams.get('payment')

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    setUser(session.user)
    await Promise.all([fetchApplications(), fetchBookings()])
    setLoading(false)
  }

  async function fetchApplications() {
    try {
      const res = await fetch('/api/applications')
      if (res.ok) {
        const data = await res.json()
        setApplications(data.applications || data || [])
      }
    } catch (err) {
      console.error('Failed to fetch applications:', err)
    }
  }

  async function fetchBookings() {
    try {
      const res = await fetch('/api/bookings')
      if (res.ok) {
        const data = await res.json()
        setBookings(data.bookings || data || [])
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg mb-6">
            ✓ Payment successful! Your booking will be confirmed shortly.
          </div>
        )}
        {paymentStatus === 'cancel' && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-6">
            Payment was canceled. You can try booking again.
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-ghost px-4 py-2"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('applications')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'applications'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                My Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                My Bookings ({bookings.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No applications yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start exploring education programs to apply.</p>
                    <div className="mt-6">
                      <a href="/search?type=PROGRAM" className="btn-primary px-6 py-2">
                        Browse Programs
                      </a>
                    </div>
                  </div>
                ) : (
                  applications.map((app) => (
                    <div key={app.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {app.listing?.title || 'Program Application'}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                          app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                          app.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                      {app.listing?.program && (
                        <div className="text-sm text-gray-700">
                          <p><strong>Institution:</strong> {app.listing.program.institution}</p>
                          <p><strong>Degree:</strong> {app.listing.program.degree}</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Discover amazing travel packages to book.</p>
                    <div className="mt-6">
                      <a href="/search?type=TRAVEL" className="btn-primary px-6 py-2">
                        Browse Travel Packages
                      </a>
                    </div>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.listing?.title || 'Travel Booking'}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {booking.startDate && (
                          <p><strong>Travel Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} - {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'TBD'}</p>
                        )}
                        <p><strong>Total:</strong> ${((booking.totalCents || 0) / 100).toFixed(2)}</p>
                        {booking.stripeSessionId && (
                          <p className="text-xs text-gray-500 mt-2">Booking ID: {booking.stripeSessionId}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
