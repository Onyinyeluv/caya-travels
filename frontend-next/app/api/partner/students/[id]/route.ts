import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../../lib/supabaseServer'
import { prisma } from '../../../../../lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { id } = params
    const app = await prisma.application.findUnique({ where: { id } })
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const user = await prisma.user.findUnique({ where: { email: userData.user.email } })
    const partner = user ? await prisma.partner.findUnique({ where: { userId: user.id } }) : null
    if (!partner || app.partnerId !== partner.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!partner.approved) return NextResponse.json({ error: 'Partner not approved' }, { status: 403 })

    return NextResponse.json(app)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch application' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const { id } = params
    const body = await request.json()
    const { status, partnerNotes } = body

    const app = await prisma.application.findUnique({ where: { id } })
    if (!app) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const user = await prisma.user.findUnique({ where: { email: userData.user.email } })
    const partner = user ? await prisma.partner.findUnique({ where: { userId: user.id } }) : null
    if (!partner || app.partnerId !== partner.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!partner.approved) return NextResponse.json({ error: 'Partner not approved' }, { status: 403 })

    const updated = await prisma.application.update({ where: { id }, data: { status, partnerNotes } })

    // optionally send notification email to applicant (best-effort)
    try {
      const { sendBookingConfirmed } = await import('../../../../lib/mailer')
      if (status === 'ACCEPTED') {
        // best-effort: notify applicant
        await sendBookingConfirmed({ to: app.email, name: app.applicantName, listingTitle: 'Application', bookingId: app.id, appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' })
      }
    } catch (e) {
      console.warn('mailer optional notify failed', e)
    }

    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}
