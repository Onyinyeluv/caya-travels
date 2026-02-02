import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { syncUpsertListing, syncDeleteListing } from '../../../../lib/typesenseSync'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const listing = await prisma.listing.findUnique({ where: { id }, include: { owner: true, bookings: true, program: true } })
    if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(listing)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    const user = userData.user

    const { id } = params
    const listing = await prisma.listing.findUnique({ where: { id }, include: { owner: true } })
    if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const email = userData.user.email
    // allow owner or admin (using Admin table)
    const { isAdminByEmail } = await import('../../../../lib/auth')
    const isAdmin = await isAdminByEmail(email)
    if (!email || (listing.owner.email !== email && !isAdmin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await request.json()
    const data: any = {}
    if (body.title) data.title = body.title
    if (body.description !== undefined) data.description = body.description
    if (body.priceCents !== undefined) data.priceCents = Number(body.priceCents)
    if (body.lat !== undefined) data.lat = Number(body.lat)
    if (body.lng !== undefined) data.lng = Number(body.lng)
    if (body.imagePath !== undefined) data.imagePath = body.imagePath
    if (body.type !== undefined) data.type = body.type

    // if imagePath is being changed, attempt to delete the old image from Supabase storage
    if (body.imagePath !== undefined && listing.imagePath && listing.imagePath !== body.imagePath) {
      try {
        // remove expects array of file paths
        await supabaseServer.storage.from('listings').remove([listing.imagePath])
      } catch (e) {
        console.warn('Failed to remove old image from storage', e)
      }
    }

    const updated = await prisma.listing.update({ where: { id }, data })
    // handle program upsert if provided
    try {
      if (body.program && typeof body.program === 'object') {
        const existing = await prisma.program.findUnique({ where: { listingId: id } })
        if (existing) {
          await prisma.program.update({ where: { id: existing.id }, data: {
            degree: body.program.degree ?? existing.degree,
            intakeStart: body.program.intakeStart ? new Date(body.program.intakeStart) : existing.intakeStart,
            intakeEnd: body.program.intakeEnd ? new Date(body.program.intakeEnd) : existing.intakeEnd,
            requirements: body.program.requirements ?? existing.requirements,
            applicationFeeCents: body.program.applicationFeeCents ?? existing.applicationFeeCents,
            documents: body.program.documents ?? existing.documents
          }})
        } else {
          await prisma.program.create({ data: {
            listingId: id,
            degree: body.program.degree || null,
            intakeStart: body.program.intakeStart ? new Date(body.program.intakeStart) : null,
            intakeEnd: body.program.intakeEnd ? new Date(body.program.intakeEnd) : null,
            requirements: body.program.requirements || null,
            applicationFeeCents: body.program.applicationFeeCents ?? null,
            documents: body.program.documents ?? null
          }})
        }
      }
    } catch (e) {
      console.warn('Failed to upsert program details', e)
    }
    // audit log for update
    try {
      await prisma.auditLog.create({
        data: {
          action: 'UPDATE_LISTING',
          entity: 'Listing',
          entityId: updated.id,
          userId: user.id,
          userEmail: user.email,
          meta: data
        }
      })
    } catch (e) {
      console.warn('Failed to write audit log for listing update', e)
    }

    // sync updated listing to Typesense (best-effort)
    try {
      await syncUpsertListing({ id: updated.id, title: updated.title, description: updated.description || '', priceCents: updated.priceCents, lat: updated.lat, lng: updated.lng })
    } catch (e) {
      console.warn('Typesense sync (update) failed', e)
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update listing' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const auth = _.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { id } = params
    const listing = await prisma.listing.findUnique({ where: { id }, include: { owner: true } })
    if (!listing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const email = userData.user.email
    const { isAdminByEmail } = await import('../../../../lib/auth')
    const isAdmin = await isAdminByEmail(email)
    if (!email || (listing.owner.email !== email && !isAdmin)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // remove image from storage if present
    try {
      if (listing.imagePath) {
        await supabaseServer.storage.from('listings').remove([listing.imagePath])
      }
    } catch (e) {
      console.warn('Failed to remove listing image from storage', e)
    }

    await prisma.listing.delete({ where: { id } })
    await prisma.auditLog.create({
      data: {
        action: 'DELETE_LISTING',
        entity: 'Listing',
        entityId: id,
        userId: userData.user.id,
        userEmail: userData.user.email
      }
    })

    // delete from Typesense (non-blocking)
    try {
      await syncDeleteListing(id)
    } catch (e) {
      console.warn('Typesense sync (delete) failed', e)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 })
  }
}
