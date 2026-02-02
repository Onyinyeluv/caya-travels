import typesense from './typesenseClient'

type ListingDoc = {
  id: string
  title: string
  description?: string
  priceCents?: number
  lat?: number
  lng?: number
  _geo?: string
}

export async function syncUpsertListing(l: ListingDoc) {
  try {
    const doc: any = {
      id: l.id,
      title: l.title,
      description: l.description || '',
      priceCents: typeof l.priceCents === 'number' ? l.priceCents : Number(l.priceCents || 0),
      lat: l.lat ?? 0,
      lng: l.lng ?? 0,
      _geo: `${l.lat ?? 0},${l.lng ?? 0}`
    }

    // @ts-ignore - typesense client typings vary
    await typesense.collections('listings').documents().upsert(doc)
    return true
  } catch (err) {
    console.warn('Typesense upsert failed for listing', l.id, err)
    return false
  }
}

export async function syncDeleteListing(id: string) {
  try {
    // @ts-ignore
    await typesense.collections('listings').documents(id).delete()
    return true
  } catch (err) {
    console.warn('Typesense delete failed for listing', id, err)
    return false
  }
}

export default { syncUpsertListing, syncDeleteListing }
