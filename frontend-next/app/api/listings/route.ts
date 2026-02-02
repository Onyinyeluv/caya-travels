import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { syncUpsertListing } from '../../../lib/typesenseSync'

export async function GET() {
  try {
    const listings = await prisma.listing.findMany({
      include: { owner: { select: { id: true, email: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(listings)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, priceCents, lat, lng, ownerEmail, imagePath, type, program } = body
    if (!ownerEmail) return NextResponse.json({ error: 'ownerEmail required' }, { status: 400 })

    let owner = await prisma.user.findUnique({ where: { email: ownerEmail } })
    if (!owner) {
      owner = await prisma.user.create({ data: { email: ownerEmail, name: body.ownerName || null } })
    }

    // if owner is a partner, require they are approved before allowing creation
    const ownerPartner = await prisma.partner.findUnique({ where: { userId: owner.id } })
    if (ownerPartner && !ownerPartner.approved) {
      return NextResponse.json({ error: 'Partner not approved' }, { status: 403 })
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        priceCents: Number(priceCents || 0),
        lat: Number(lat || 0),
        lng: Number(lng || 0),
        imagePath: imagePath || null,
        ownerId: owner.id,
        type: type || 'TRAVEL'
      }
    })

    // if program details supplied, create Program record linked to this listing
    if (program && typeof program === 'object') {
      try {
        await prisma.program.create({
          data: {
            listingId: listing.id,
            degree: program.degree || null,
            intakeStart: program.intakeStart ? new Date(program.intakeStart) : null,
            intakeEnd: program.intakeEnd ? new Date(program.intakeEnd) : null,
            requirements: program.requirements || null,
            applicationFeeCents: program.applicationFeeCents ?? null,
            documents: program.documents ?? null
          }
        })
      } catch (e) {
        console.warn('Failed to create program details', e)
      }
    }

    // create audit log for creation if possible
    try {
      await prisma.auditLog.create({
        data: {
          action: 'CREATE_LISTING',
          entity: 'Listing',
          entityId: listing.id,
          userId: owner.id,
          userEmail: owner.email,
          meta: { title: listing.title }
        }
      })
    } catch (e) {
      console.warn('Failed to write audit log for listing create', e)
    }

    // try to upsert into Typesense (non-blocking)
    try {
      await syncUpsertListing({ id: listing.id, title: listing.title, description: listing.description || '', priceCents: listing.priceCents, lat: listing.lat, lng: listing.lng })
    } catch (e) {
      console.warn('Typesense sync (create) failed', e)
    }

    return NextResponse.json(listing, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
  }
}
