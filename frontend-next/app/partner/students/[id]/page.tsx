'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import { useParams, useRouter } from 'next/navigation'

export default function StudentDetail() {
  const params = useParams()
  const id = params?.id as string
  const [app, setApp] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')
  const router = useRouter()

  useEffect(()=>{
    async function load(){
      setLoading(true)
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token
      if (!token) { setLoading(false); return }
      const res = await fetch(`/api/partner/students/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) {
        const data = await res.json()
        setApp(data)
        setStatus(data.status)
        setNotes((data.partnerNotes && JSON.stringify(data.partnerNotes)) || '')
      }
      setLoading(false)
    }
    if (id) load()
  }, [id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    const session = await supabase.auth.getSession()
    const token = session.data.session?.access_token
    if (!token) return
    try {
      const body: any = { status }
      try { body.partnerNotes = JSON.parse(notes) } catch { body.partnerNotes = notes }
      const res = await fetch(`/api/partner/students/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(body) })
      if (res.ok) {
        const updated = await res.json()
        setApp(updated)
        alert('Saved')
        router.push('/partner/students')
      } else {
        const err = await res.json()
        alert(err?.error || 'Failed to save')
      }
    } catch (e:any) { alert(e?.message || String(e)) }
  }

  if (loading) return <main style={{padding:20}}>Loading...</main>
  if (!app) return <main style={{padding:20}}>Not found</main>

  return (
    <main style={{padding:20}}>
      <h1>{app.applicantName}</h1>
      <div><strong>Email:</strong> {app.email}</div>
      <div style={{marginTop:12}}>
        <form onSubmit={handleSave} style={{display:'grid',gap:8,maxWidth:640}}>
          <label>Status</label>
          <select value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="PENDING">PENDING</option>
            <option value="IN_REVIEW">IN_REVIEW</option>
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="REJECTED">REJECTED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
          </select>

          <label>Partner notes (JSON or text)</label>
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} rows={6} />

          <div style={{display:'flex',gap:8}}>
            <button type="submit">Save</button>
            <button type="button" onClick={()=>router.push('/partner/students')}>Back</button>
          </div>
        </form>
      </div>
    </main>
  )
}
