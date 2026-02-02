"use client"

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../../lib/supabaseClient'

type Partner = {
  id: string
  name?: string
  approved: boolean
  createdAt: string
  user: { id: string; email?: string }
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(20)
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')
  const [total, setTotal] = useState(0)

  const fetchPartners = useCallback(async () => {
    setLoading(true)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) return
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('perPage', String(perPage))
      if (q) params.set('q', q)
      const res = await fetch(`/api/admin/partners?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setPartners(data.partners || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [page, perPage, q])

  useEffect(() => { fetchPartners() }, [fetchPartners])

  async function setApproved(id: string, approved: boolean) {
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) return
      const res = await fetch(`/api/admin/partners/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ approved }) })
      if (res.ok) fetchPartners()
      else console.error('Failed to update')
    } catch (err) { console.error(err) }
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin — Partners</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input placeholder="search name or email" value={q} onChange={(e)=>setQ(e.target.value)} />
        <button onClick={() => { setPage(1); fetchPartners() }}>Filter</button>
      </div>

      {loading ? <div>Loading...</div> : (
        <div>
          <div style={{ marginBottom: 8 }}>Total: {total}</div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {partners.map(p => (
              <li key={p.id} style={{ padding: 12, borderBottom: '1px solid #eee' }}>
                <div><strong>{p.name || p.user?.email || 'Partner'}</strong> — {p.user?.email}</div>
                <div>Created: {new Date(p.createdAt).toLocaleString()} — Approved: {p.approved ? 'Yes' : 'No'}</div>
                <div style={{ marginTop: 8 }}>
                  {!p.approved && <button onClick={()=>setApproved(p.id,true)} style={{ marginRight: 8 }}>Approve</button>}
                  {p.approved && <button onClick={()=>setApproved(p.id,false)}>Revoke</button>}
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
