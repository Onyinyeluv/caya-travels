'use client'

import { useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NewStudent() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [listingId, setListingId] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const session = await supabase.auth.getSession()
      const token = session.data.session?.access_token
      if (!token) { setMessage('Please sign in'); setLoading(false); return }

      const res = await fetch('/api/partner/students', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ applicantName: name, email, phone, listingId }) })
      if (res.ok) {
        setMessage('Student application created')
        setTimeout(()=>router.push('/partner/students'),600)
      } else {
        const err = await res.json()
        setMessage(err?.error || 'Failed to create')
      }
    } catch (e:any) { setMessage(e?.message || String(e)) }
    finally { setLoading(false) }
  }

  return (
    <main style={{padding:20}}>
      <h1>Register Student / Create Application</h1>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8,maxWidth:480}}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Applicant name" required />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Applicant email" type="email" required />
        <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone (optional)" />
        <input value={listingId} onChange={(e)=>setListingId(e.target.value)} placeholder="Listing ID (optional)" />
        <div style={{display:'flex',gap:8}}>
          <button type="submit" disabled={loading}>Create</button>
          <button type="button" onClick={()=>router.push('/partner/students')}>Cancel</button>
        </div>
      </form>
      {message && <div style={{marginTop:12}}>{message}</div>}
    </main>
  )
}
