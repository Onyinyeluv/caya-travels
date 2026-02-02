"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'

type Booking = {
  id: string
  listing: { id: string; title?: string }
  startDate: string
  endDate: string
  totalCents: number
  status: string
}

export default function BookingDetailPage() {
  const params = useParams()
  const id = params?.id as string
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!id) return
    fetchBooking()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchBooking() {
    setLoading(true)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) return
      const res = await fetch(`/api/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) {
        setMessage('Failed to load booking')
        return
      }
      const data = await res.json()
      setBooking(data.booking)
    } catch (err) {
      console.error(err)
      setMessage('Failed to load booking')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    if (!confirm('Cancel this booking?')) return
    setMessage(null)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) {
        router.push('/signin')
        return
      }
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const d = await res.json()
        setBooking(d.booking)
        setMessage('Booking cancelled')
      } else {
        const e = await res.json()
        setMessage(e?.error || 'Cancel failed')
      }
    } catch (err) {
      console.error(err)
      setMessage('Cancel failed')
    }
  }

  if (loading) return <main style={{ padding: 20 }}>Loading...</main>
  if (!booking) return <main style={{ padding: 20 }}>{message || 'No booking found'}</main>

  return (
    <main style={{ padding: 20 }}>
      <h1>Booking</h1>
      <p><strong>Listing:</strong> {booking.listing?.title}</p>
      <p><strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</p>
      <p><strong>Amount:</strong> ${(booking.totalCents/100).toFixed(2)}</p>
      <p><strong>Status:</strong> {booking.status}</p>

      {booking.status !== 'CONFIRMED' && booking.status !== 'CANCELLED' && (
        <div style={{ marginTop: 12 }}>
          <button onClick={handleCancel}>Cancel booking</button>
        </div>
      )}

      {message && <div style={{ marginTop: 12 }}>{message}</div>}
    </main>
  )
}
