'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.push('/profile')
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else router.push('/profile')
  }

  return (
    <main style={{padding:20,fontFamily:'system-ui'}}>
      <h1>Sign In / Sign Up</h1>
      <form onSubmit={handleSignIn} style={{display:'grid',gap:8,maxWidth:360}}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8}}>
          <button onClick={handleSignIn} disabled={loading} type="button">Sign In</button>
          <button onClick={handleSignUp} disabled={loading} type="button">Sign Up</button>
        </div>
        {error && <div style={{color:'red'}}>{error}</div>}
      </form>
    </main>
  )
}
