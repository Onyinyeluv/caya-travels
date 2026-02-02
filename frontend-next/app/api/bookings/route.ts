import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { supabaseServer } from '../../../lib/supabaseServer'

export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const supaUser = userData.user
    const body = await request.json()
    const { listingId, startDate, endDate, totalCents } = body

    if (!listingId || !startDate || !endDate || !totalCents) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // find or create prisma user by email
    const email = supaUser.email || undefined
    if (!email) return NextResponse.json({ error: 'User has no email' }, { status: 400 })

    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({ data: { email, name: supaUser.user_metadata?.full_name || undefined } })
    }

    // basic availability check: overlapping bookings
    const s = new Date(startDate)
    const e = new Date(endDate)
    const overlap = await prisma.booking.findFirst({
      where: {
        listingId,
        AND: [
          { startDate: { lte: e } },
          { endDate: { gte: s } }
        ]
      }
    })
    if (overlap) return NextResponse.json({ error: 'Listing not available for those dates' }, { status: 409 })

    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        listingId,
        startDate: s,
        endDate: e,
        totalCents: Number(totalCents)
      }
    })

    // audit log
    await prisma.auditLog.create({
      data: {
        action: 'CREATE_BOOKING',
        entity: 'Booking',
        entityId: booking.id,
        userId: user.id,
        userEmail: user.email,
        meta: { listingId, startDate: s.toISOString(), endDate: e.toISOString(), totalCents: Number(totalCents) }
      }
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const email = userData.user.email
    if (!email) return NextResponse.json({ error: 'No email' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ bookings: [] })

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ bookings })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
