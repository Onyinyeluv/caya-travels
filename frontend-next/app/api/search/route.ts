import { NextResponse } from 'next/server'
import typesense from '../../../lib/typesenseClient'
import { prisma } from '../../../lib/prisma'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''
  const lat = url.searchParams.get('lat')
  const lng = url.searchParams.get('lng')

  const searchParams: any = {
    q: q || '*',
    query_by: 'title,description',
    sort_by: 'createdAt:desc',
    per_page: 20
  }

  if (lat && lng) {
    // Typesense uses `geopoint` and `radius` in some client versions
    searchParams['geopoint'] = `${lat},${lng}`
    searchParams['radius'] = 50000
  }

  try {
    const results = await typesense.collections('listings').documents().search(searchParams)
    // normalize returned hits to the shape frontend expects: array of documents
    const hits = Array.isArray(results.hits)
      ? results.hits.map((h: any) => {
          const doc = h.document || h
          return {
            id: doc.id,
            title: doc.title,
            description: doc.description,
            priceCents: typeof doc.priceCents === 'number' ? doc.priceCents : Number(doc.priceCents || 0),
            lat: doc.lat ? Number(doc.lat) : undefined,
            lng: doc.lng ? Number(doc.lng) : undefined,
            _raw: doc
          }
        })
      : []

    return NextResponse.json({ hits })
  } catch (err) {
    console.warn('Typesense search failed, falling back to DB search:', err)
    try {
      // fallback to simple DB search using Prisma
      const where: any = q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } }
            ]
          }
        : {}

      const listings = await prisma.listing.findMany({ where, orderBy: { createdAt: 'desc' }, take: 20 })
      const hits = listings.map((l) => ({ id: l.id, title: l.title, description: l.description, priceCents: l.priceCents, lat: l.lat ?? undefined, lng: l.lng ?? undefined, _raw: l }))
      return NextResponse.json({ hits })
    } catch (dbErr) {
      console.error('DB fallback search failed:', dbErr)
      return NextResponse.json({ error: 'Search failed' }, { status: 500 })
    }
  }
}
