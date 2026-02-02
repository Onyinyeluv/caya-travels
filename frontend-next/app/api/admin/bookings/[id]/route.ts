import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { supabaseServer } from '../../../../../lib/supabaseServer'
import { sendBookingConfirmed, sendBookingCancelled } from '../../../../../lib/mailer'

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const email = userData.user.email
    const isAdmin = !!(await prisma.admin.findFirst({ where: { email } }))
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { id } = params
    const body = await request.json()
    const { status } = body
    if (!status) return NextResponse.json({ error: 'Missing status' }, { status: 400 })

    const updated = await prisma.booking.update({ where: { id }, data: { status } })

    try {
      await prisma.auditLog.create({ data: { action: 'ADMIN_UPDATE_BOOKING', entity: 'Booking', entityId: id, userEmail: email, userId: null, meta: { status } } })
    } catch (e) {
      console.warn('Audit log failed', e)
    }

    // send notification emails on important status changes
    try {
      if (status === 'CONFIRMED') {
        const b = await prisma.booking.findUnique({ where: { id }, include: { user: true, listing: true } })
        if (b) await sendBookingConfirmed({ id: b.id, userEmail: b.user.email, listingTitle: b.listing?.title, startDate: b.startDate?.toISOString(), endDate: b.endDate?.toISOString(), totalCents: b.totalCents })
      } else if (status === 'CANCELLED') {
        const b = await prisma.booking.findUnique({ where: { id }, include: { user: true, listing: true } })
        if (b) await sendBookingCancelled({ id: b.id, userEmail: b.user.email, listingTitle: b.listing?.title, startDate: b.startDate?.toISOString(), endDate: b.endDate?.toISOString(), totalCents: b.totalCents })
      }
    } catch (e) {
      console.warn('Failed to send booking notification', e)
    }

    return NextResponse.json({ booking: updated })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}
