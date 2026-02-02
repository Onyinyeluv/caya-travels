import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { sendBookingCancelled } from '../../../../lib/mailer'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const auth = _.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { id } = params
    const booking = await prisma.booking.findUnique({ where: { id }, include: { listing: true, user: true } })
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const email = userData.user.email
    // allow owner of booking or admin by email (Admin table)
    const isAdmin = !!(await prisma.admin.findFirst({ where: { email } }))
    if (booking.user.email !== email && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({ booking })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
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
    const booking = await prisma.booking.findUnique({ where: { id }, include: { user: true } })
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const email = userData.user.email
    const isAdmin = !!(await prisma.admin.findFirst({ where: { email } }))
    if (booking.user.email !== email && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    // Only allow cancelling if not already confirmed or cancelled
    if (booking.status === 'CONFIRMED') return NextResponse.json({ error: 'Cannot cancel a confirmed booking' }, { status: 409 })

    const updated = await prisma.booking.update({ where: { id }, data: { status: 'CANCELLED' } })

    try {
      await prisma.auditLog.create({ data: { action: 'CANCEL_BOOKING', entity: 'Booking', entityId: id, userId: booking.userId, userEmail: booking.user.email } })
    } catch (e) {
      console.warn('Failed to write audit log for cancel', e)
    }

    // send cancellation email (best-effort)
    try {
      await sendBookingCancelled({ id: updated.id, userEmail: booking.user.email, listingTitle: booking.listingTitle || undefined, startDate: updated.startDate?.toISOString(), endDate: updated.endDate?.toISOString(), totalCents: updated.totalCents })
    } catch (e) {
      console.warn('Failed to send cancellation email', e)
    }

    return NextResponse.json({ success: true, booking: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to cancel booking' }, { status: 500 })
  }
}
