'use client'

import { useEffect, useState } from 'react'
import ListingForm from '../../../components/ListingForm'

type Listing = { id: string; title: string; description?: string }

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([])
  const [editing, setEditing] = useState<any | null>(null)

  async function load() {
    const res = await fetch('/api/listings')
    const data = await res.json()
    setListings(data)
  }

  useEffect(()=>{ load() }, [])

  function handleSaved(l: any) {
    setEditing(null)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete listing?')) return
    const token = (await fetch('/api/auth/session').then(r=>r.json()).catch(()=>null))?.access_token
    const res = await fetch(`/api/listings/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token || ''}` } })
    if (res.ok) load()
    else alert('Delete failed')
  }

  return (
    <main style={{padding:20}}>
      <h1>Admin — Listings</h1>
      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <button onClick={()=>setEditing(null)}>Create new listing</button>
          <ul style={{listStyle:'none',padding:0}}>
            {listings.map(l => (
              <li key={l.id} style={{borderBottom:'1px solid #eee',padding:8}}>
                <strong>{l.title}</strong>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <button onClick={()=>setEditing(l)}>Edit</button>
                  <button onClick={()=>handleDelete(l.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{width:480}}>
          <h2>{editing ? 'Edit' : 'Create'} Listing</h2>
          <ListingForm initial={editing} onSaved={handleSaved} />
        </div>
      </div>
    </main>
  )
}
