'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function PartnerOnboard() {
  const [name, setName] = useState('')
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
      if (!token) {
        setMessage('Please sign in first')
        setLoading(false)
        return
      }

      const res = await fetch('/api/partner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name })
      })

      const data = await res.json()
      if (res.ok) {
        setMessage(data?.message || 'Partner profile created and pending approval. Redirecting...')
        setTimeout(()=>router.push('/partner/dashboard'),800)
      } else {
        setMessage(data?.error || 'Failed to create partner')
      }
    } catch (e: any) {
      setMessage(e?.message || String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{padding:20}}>
      <h1>Partner Onboarding</h1>
      <p>Quickly create your partner profile to publish listings.</p>
      <form onSubmit={handleSubmit} style={{display:'grid',gap:8,maxWidth:480}}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Organization / Partner name" required />
        <div style={{display:'flex',gap:8}}>
          <button type="submit" disabled={loading}>Create Partner Profile</button>
        </div>
      </form>
      {message && <div style={{marginTop:12}}>{message}</div>}
    </main>
  )
}
