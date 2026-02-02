'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

type Log = {
  id: string
  action: string
  entity: string
  entityId: string
  userId?: string
  userEmail?: string
  meta?: any
  createdAt: string
}

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<Log[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  async function load(p = 1) {
    setLoading(true)
    try {
      const session = await supabase.auth.getSession()
      const token = session?.data?.session?.access_token
      if (!token) {
        setLogs([])
        return
      }

      const res = await fetch(`/api/admin/audit?page=${p}&pageSize=${pageSize}`, { headers: { Authorization: `Bearer ${token}` } })
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setLogs(data.logs || [])
      setTotal(data.total || 0)
      setPage(data.page || p)
    } catch (err) {
      console.error(err)
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(1) }, [])

  return (
    <main style={{padding:20}}>
      <h1>Audit Log</h1>
      {loading && <div>Loading...</div>}
      <div style={{marginTop:12}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>Time</th>
              <th style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>Action</th>
              <th style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>Entity</th>
              <th style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>User</th>
              <th style={{textAlign:'left',borderBottom:'1px solid #ddd'}}>Meta</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td style={{padding:'8px 6px',verticalAlign:'top'}}>{new Date(l.createdAt).toLocaleString()}</td>
                <td style={{padding:'8px 6px',verticalAlign:'top'}}>{l.action}</td>
                <td style={{padding:'8px 6px',verticalAlign:'top'}}>{l.entity}:{l.entityId}</td>
                <td style={{padding:'8px 6px',verticalAlign:'top'}}>{l.userEmail || l.userId || '-'}</td>
                <td style={{padding:'8px 6px',verticalAlign:'top'}}><pre style={{whiteSpace:'pre-wrap',margin:0}}>{JSON.stringify(l.meta || {}, null, 2)}</pre></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{marginTop:12,display:'flex',gap:8}}>
          <button onClick={() => load(Math.max(1, page-1))} disabled={page<=1}>Prev</button>
          <div>Page {page} — {total} entries</div>
          <button onClick={() => load(page+1)} disabled={page*pageSize >= total}>Next</button>
        </div>
      </div>
    </main>
  )
}
