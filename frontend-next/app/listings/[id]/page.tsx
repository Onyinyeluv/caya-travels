'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

export default function ListingDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [applyLoading, setApplyLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState('')
  const [showApplyForm, setShowApplyForm] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    startDate: '',
    endDate: ''
  })
  
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchListing()
  }, [id])

  async function fetchListing() {
    try {
      const res = await fetch(`/api/listings/${id}`)
      if (!res.ok) throw new Error('Failed to fetch listing')
      const data = await res.json()
      setListing(data)
    } catch (err) {
      setError('Failed to load listing')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleApply(e: React.FormEvent) {
    e.preventDefault()
    setApplyLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/signin')
        return
      }

      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      })

      if (!res.ok) throw new Error('Application failed')
      
      alert('Application submitted successfully! We\'ll be in touch soon.')
      setShowApplyForm(false)
      setFormData({ name: '', email: '', phone: '', message: '', startDate: '', endDate: '' })
    } catch (err) {
      alert('Failed to submit application. Please try again.')
      console.error(err)
    } finally {
      setApplyLoading(false)
    }
  }

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault()
    setBookingLoading(true)
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/auth/signin')
        return
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          startDate: formData.startDate,
          endDate: formData.endDate
        })
      })

      if (!res.ok) throw new Error('Booking failed')
      const data = await res.json()
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (err) {
      alert('Failed to create booking. Please try again.')
      console.error(err)
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">{error || 'Listing not found'}</p>
      </div>
    )
  }

  const imageUrl = listing.imageUrl
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/listings/${listing.imageUrl}`
    : '/placeholder-listing.jpg'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-200">
        <img 
          src={imageUrl} 
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              listing.type === 'PROGRAM' ? 'bg-primary text-dark' : 'bg-blue-500 text-white'
            }`}>
              {listing.type === 'PROGRAM' ? 'Education Program' : 'Travel Package'}
            </span>
            <h1 className="text-4xl font-bold text-white mt-2">{listing.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </section>

            {listing.type === 'PROGRAM' && listing.program && (
              <section className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Institution</h3>
                    <p className="text-gray-700">{listing.program.institution}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Degree Type</h3>
                    <p className="text-gray-700">{listing.program.degree}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                    <p className="text-gray-700">{listing.program.duration}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Next Intake</h3>
                    <p className="text-gray-700">
                      {listing.program.intakeStart && new Date(listing.program.intakeStart).toLocaleDateString()}
                    </p>
                  </div>
                  {listing.program.applicationDeadline && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Application Deadline</h3>
                      <p className="text-red-600 font-semibold">
                        {new Date(listing.program.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {listing.program.tuitionFee && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Tuition Fee</h3>
                      <p className="text-gray-700">${listing.program.tuitionFee.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                {listing.program.requirements && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Requirements</h3>
                    <p className="text-gray-700 whitespace-pre-line">{listing.program.requirements}</p>
                  </div>
                )}
              </section>
            )}

            <section className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <p className="text-gray-700 mb-4">
                <strong>Country:</strong> {listing.country}<br/>
                <strong>City:</strong> {listing.city}
              </p>
              {listing.lat && listing.lng && (
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map coordinates: {listing.lat}, {listing.lng}</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
              <div className="mb-6">
                <p className="text-3xl font-bold text-gray-900">
                  ${((listing.priceCents || listing.price || 0)/100).toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">
                  {listing.type === 'PROGRAM' ? 'Application fee' : 'Total price'}
                </p>
              </div>

              {listing.type === 'PROGRAM' ? (
                <>
                  {!showApplyForm ? (
                    <button
                      onClick={() => setShowApplyForm(true)}
                      className="w-full btn-primary py-3 text-center"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Application Form</h3>
                      <Input
                        label="Full Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <Input
                        label="Email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                      <Textarea
                        label="Why are you interested?"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={applyLoading}
                          className="flex-1 btn-primary py-2.5"
                        >
                          {applyLoading ? 'Submitting...' : 'Submit'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowApplyForm(false)}
                          className="flex-1 btn-ghost py-2.5"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                <>
                  {!showBookingForm ? (
                    <button
                      onClick={() => setShowBookingForm(true)}
                      className="w-full btn-primary py-3 text-center"
                    >
                      Book Now
                    </button>
                  ) : (
                    <form onSubmit={handleBooking} className="space-y-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                      <Input
                        label="Start Date"
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      />
                      <Input
                        label="End Date"
                        type="date"
                        required
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="flex-1 btn-primary py-2.5"
                        >
                          {bookingLoading ? 'Processing...' : 'Continue to Payment'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowBookingForm(false)}
                          className="flex-1 btn-ghost py-2.5"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Verified listing</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm">Secure payment</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="text-sm">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
