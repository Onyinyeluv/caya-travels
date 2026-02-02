import { PrismaClient } from '@prisma/client'
import Typesense from 'typesense'

const prisma = new PrismaClient()

const client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || 'localhost',
      port: Number(process.env.TYPESENSE_PORT || 8108),
      protocol: process.env.TYPESENSE_PROTOCOL || 'http'
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 2
})

async function main() {
  const listings = await prisma.listing.findMany({ include: { owner: true } })
  for (const l of listings) {
    const doc = {
      id: l.id,
      title: l.title,
      description: l.description || '',
      priceCents: l.priceCents,
      lat: l.lat,
      lng: l.lng,
      _geo: `${l.lat},${l.lng}`
    }

    try {
      // try upsert; if collection missing this may fail
      // Typesense Node client supports upsert via documents().upsert
      // If upsert isn't available, the create will fail and we'll catch below
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.collections('listings').documents().upsert(doc)
      console.log('Upserted listing', l.id)
    } catch (err) {
      console.warn('Upsert failed, attempting to create collection then retry:', err)
      try {
        await client.collections().create({
          name: 'listings',
          fields: [
            { name: 'id', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'priceCents', type: 'int32' },
            { name: 'lat', type: 'float' },
            { name: 'lng', type: 'float' },
            { name: '_geo', type: 'geopoint' }
          ],
          default_sorting_field: 'priceCents'
        })
        // retry upsert
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await client.collections('listings').documents().upsert(doc)
        console.log('Created collection and upserted listing', l.id)
      } catch (err2) {
        console.error('Failed to create collection or upsert document for', l.id, err2)
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
