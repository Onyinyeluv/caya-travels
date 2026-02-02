'use client'

import { useState, useEffect, useRef } from 'react'

type Props = { onSearch: (q: string) => void; debounceMs?: number }

export default function SearchBar({ onSearch, debounceMs = 300 }: Props) {
  const [q, setQ] = useState('')
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    // debounce input and call onSearch
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      onSearch(q)
    }, debounceMs)
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [q, debounceMs, onSearch])

  function submit(e?: React.FormEvent) {
    e?.preventDefault()
    if (timerRef.current) window.clearTimeout(timerRef.current)
    onSearch(q)
  }

  function clear() {
    setQ('')
    if (timerRef.current) window.clearTimeout(timerRef.current)
    onSearch('')
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search destinations, properties, keywords"
        style={{ flex: 1, padding: 8 }}
      />
      <button type="button" onClick={clear}>Clear</button>
      <button type="submit">Search</button>
    </form>
  )
}
