'use client'

import Link from 'next/link'

type Hit = {
  id: string
  title: string
  description?: string
  priceCents?: number
  lat?: number
  lng?: number
}

type Props = { hits: Hit[] }

export default function ResultsList({ hits }: Props) {
  if (!hits || hits.length === 0) return <div>No results</div>

  return (
    <ul style={{listStyle:'none',padding:0,margin:0}}>
      {hits.map((h) => (
        <li key={h.id} style={{padding:12,borderBottom:'1px solid #eee'}}>
          <h3 style={{margin:0}}>
            <Link href={`/listings/${h.id}`}>{h.title}</Link>
          </h3>
          <p style={{margin:'6px 0'}}>{h.description}</p>
          {typeof h.priceCents === 'number' && <div>From ${(h.priceCents/100).toFixed(2)}</div>}
        </li>
      ))}
    </ul>
  )
}
