'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import SearchBar from '../../components/SearchBar'
import ResultsList from '../../components/ResultsList'

const MapWithMarkers = dynamic(() => import('../../components/MapWithMarkers'), { ssr: false })

type Hit = { id: string; title: string; description?: string; priceCents?: number; lat?: number; lng?: number }

export default function SearchPage() {
  const [hits, setHits] = useState<Hit[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = useCallback(async (q: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      // our API normalizes results under `hits`
      const docs = Array.isArray(data.hits) ? data.hits.map((h: any) => h) : []
      setHits(docs)
    } catch (err) {
      console.error(err)
      setHits([])
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <main style={{ padding: 20 }}>
      <h1>Search</h1>
      <div style={{ marginBottom: 8 }}>
        <SearchBar onSearch={handleSearch} debounceMs={300} />
        {loading && <div style={{ color: '#555', marginTop: 6 }}>Searching...</div>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 16, alignItems: 'start' }}>
        <div>
          <ResultsList hits={hits} />
        </div>
        <div>
          <MapWithMarkers
            points={hits.filter((h) => h.lat && h.lng).map((h) => ({ id: h.id, lat: h.lat || 0, lng: h.lng || 0, title: h.title }))}
          />
        </div>
      </div>
    </main>
  )
}
