'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

type Props = {
  initial?: any
  onSaved?: (listing: any) => void
}

export default function ListingForm({ initial, onSaved }: Props) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [priceCents, setPriceCents] = useState((initial?.priceCents ?? 0) / 100)
  const [lat, setLat] = useState(initial?.lat ?? 0)
  const [lng, setLng] = useState(initial?.lng ?? 0)
  const [type, setType] = useState(initial?.type || 'TRAVEL')
  const [degree, setDegree] = useState(initial?.program?.degree || '')
  const [intakeStart, setIntakeStart] = useState<string | null>(initial?.program?.intakeStart ? new Date(initial.program.intakeStart).toISOString().slice(0,10) : null)
  const [intakeEnd, setIntakeEnd] = useState<string | null>(initial?.program?.intakeEnd ? new Date(initial.program.intakeEnd).toISOString().slice(0,10) : null)
  const [requirements, setRequirements] = useState(initial?.program?.requirements || '')
  const [applicationFee, setApplicationFee] = useState((initial?.program?.applicationFeeCents ?? 0) / 100)
  const [file, setFile] = useState<File | null>(null)
  const [docFiles, setDocFiles] = useState<File[] | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    try {
      if (initial?.imagePath) {
        // attempt to build public URL from Supabase
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return supabase.storage.from('listings').getPublicUrl(initial.imagePath).data.publicUrl
      }
    } catch (e) {
      // ignore
    }
    return null
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imagePath = initial?.imagePath
      if (file) {
        setUploading(true)
        const filename = `${Date.now()}_${file.name}`
        const { data, error: upErr } = await supabase.storage.from('listings').upload(filename, file)
        if (upErr) throw upErr
        imagePath = data.path
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const publicUrl = supabase.storage.from('listings').getPublicUrl(imagePath).data.publicUrl
          setPreviewUrl(publicUrl)
        } catch (e) {
          // ignore
        }
        setUploading(false)
      }

      // upload program documents if present
      let programDocuments = initial?.program?.documents ?? null
      if (docFiles && docFiles.length > 0) {
        programDocuments = programDocuments || []
        for (const df of docFiles) {
          const docName = `${Date.now()}_${df.name}`
          const { data: docData, error: docErr } = await supabase.storage.from('program-docs').upload(docName, df)
          if (docErr) throw docErr
          programDocuments.push({ name: df.name, path: docData.path })
        }
      }

      const payload: any = {
        title,
        description,
        priceCents: Math.round(priceCents * 100),
        lat: Number(lat),
        lng: Number(lng),
        type,
        program: type === 'PROGRAM' ? {
          degree,
          intakeStart: intakeStart ? new Date(intakeStart).toISOString() : null,
          intakeEnd: intakeEnd ? new Date(intakeEnd).toISOString() : null,
          requirements,
          applicationFeeCents: Math.round(applicationFee * 100) || null,
          documents: programDocuments
        } : undefined,
        imagePath
      }

      if (initial?.id) {
        const res = await fetch(`/api/listings/${initial.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        if (!res.ok) throw new Error('Failed to update')
        const updated = await res.json()
        onSaved?.(updated)
      } else {
        const res = await fetch('/api/listings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, ownerEmail: (await supabase.auth.getUser()).data.user?.email }) })
        if (!res.ok) throw new Error('Failed to create')
        const created = await res.json()
        onSaved?.(created)
      }
    } catch (err: any) {
      setError(err?.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'grid',gap:8,maxWidth:480}}>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description" />
      <div>
        <label style={{fontSize:12}}>Type</label>
        <select value={type} onChange={(e)=>setType(e.target.value)}>
          <option value="TRAVEL">Travel Offer</option>
          <option value="PROGRAM">Education Program</option>
        </select>
      </div>
      {type === 'PROGRAM' && (
        <div style={{display:'grid',gap:6}}>
          <input value={degree} onChange={(e)=>setDegree(e.target.value)} placeholder="Degree (e.g., B.Sc. Computer Science)" />
          <div style={{display:'flex',gap:8}}>
            <label style={{fontSize:12}}>Intake Start</label>
            <input type="date" value={intakeStart ?? ''} onChange={(e)=>setIntakeStart(e.target.value)} />
            <label style={{fontSize:12}}>Intake End</label>
            <input type="date" value={intakeEnd ?? ''} onChange={(e)=>setIntakeEnd(e.target.value)} />
          </div>
          <textarea value={requirements} onChange={(e)=>setRequirements(e.target.value)} placeholder="Entry requirements" />
          <input type="number" value={applicationFee} onChange={(e)=>setApplicationFee(Number(e.target.value))} placeholder="Application fee (USD)" />
        </div>
      )}
      <input type="number" value={priceCents} onChange={(e)=>setPriceCents(Number(e.target.value))} placeholder="Price (USD)" />
      <div style={{display:'flex',gap:8}}>
        <input type="number" step="0.000001" value={lat} onChange={(e)=>setLat(Number(e.target.value))} placeholder="Latitude" />
        <input type="number" step="0.000001" value={lng} onChange={(e)=>setLng(Number(e.target.value))} placeholder="Longitude" />
      </div>
      <input type="file" accept="image/*" onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
      {type === 'PROGRAM' && (
        <div>
          <label style={{fontSize:12}}>Program documents (PDF)</label>
          <input type="file" accept="application/pdf" multiple onChange={(e)=>setDocFiles(Array.from(e.target.files || []))} />
          {docFiles && docFiles.length > 0 && <div style={{fontSize:12,color:'#444'}}>{docFiles.length} document(s) selected</div>}
        </div>
      )}
      {previewUrl && (
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <img src={previewUrl} alt="preview" style={{width:120,height:80,objectFit:'cover',borderRadius:6}} />
          <div style={{fontSize:12,color:'#666'}}>
            {file ? file.name : 'Current image'}
          </div>
        </div>
      )}
      {uploading && <div style={{color:'#555'}}>Uploading image...</div>}
      <div style={{display:'flex',gap:8}}>
        <button type="submit" disabled={loading}>{initial?.id ? 'Update' : 'Create'}</button>
      </div>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  )
}
