'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function PartnerDashboard() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token
      if (!token) {
        setListings([])
        setLoading(false)
        return
      }
      const res = await fetch('/api/partner/listings', { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setListings(data)
      } else if (res.status === 403) {
        const err = await res.json()
        setListings([])
        setLoading(false)
        // show message via empty listings + special flag
        // attach a special property to indicate not approved
        setListings([{ __meta: 'not-approved', message: err?.error || 'Partner not approved' }])
        return
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <main style={{padding:20}}>
      <h1>Partner Dashboard</h1>
      {loading ? <div>Loading...</div> : (
        <div>
          {listings.length === 0 ? <div>No listings yet. Use 'Create Listing' to add one.</div> : (
            <div>
              {listings[0]?.__meta === 'not-approved' ? (
                <div>{listings[0].message || 'Your partner account is pending approval by admin.'}</div>
              ) : (
                <ul>
                  {listings.map((l)=> <li key={l.id}>{l.title} — {l.type}</li>)}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  )
}
