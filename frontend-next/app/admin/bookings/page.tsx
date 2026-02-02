"use client"

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../../lib/supabaseClient'

type Booking = {
  id: string
  listing: { id: string; title?: string }
  user: { id: string; email?: string }
  startDate: string
  endDate: string
  totalCents: number
  status: string
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [total, setTotal] = useState(0)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) return
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('perPage', String(perPage))
      if (q) params.set('q', q)
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/admin/bookings?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setBookings(data.bookings || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, perPage, q, statusFilter])

  useEffect(() => { fetchBookings() }, [fetchBookings])

  async function updateStatus(id: string, status: string) {
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) return
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ status }) })
      if (res.ok) fetchBookings()
      else console.error('Failed to update')
    } catch (err) { console.error(err) }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin — Bookings</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="search email or listing" value={q} onChange={(e)=>setQ(e.target.value)} />
        <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
        <button onClick={() => { setPage(1); fetchBookings() }}>Filter</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div>
          <div style={{ marginBottom: 8 }}>Total: {total}</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bookings.map(b => (
              <li key={b.id} style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                <div><strong>{b.listing?.title || 'Listing'}</strong> — {b.user?.email}</div>
                <div>{new Date(b.startDate).toLocaleDateString()} → {new Date(b.endDate).toLocaleDateString()}</div>
                <div>Status: {b.status} — Amount: ${(b.totalCents/100).toFixed(2)}</div>
                <div style={{ marginTop: 8 }}>
                  {b.status !== 'CONFIRMED' && <button onClick={()=>updateStatus(b.id,'CONFIRMED')} style={{ marginRight: 8 }}>Confirm</button>}
                  {b.status !== 'CANCELLED' && <button onClick={()=>updateStatus(b.id,'CANCELLED')}>Cancel</button>}
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 12 }}>
            <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Prev</button>
            <span style={{ margin: '0 8px' }}>{page}</span>
            <button onClick={() => setPage(p => p+1)}>Next</button>
          </div>
        </div>
      )}
    </main>
  )
}
