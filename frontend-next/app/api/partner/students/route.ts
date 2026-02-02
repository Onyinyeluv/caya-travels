import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    const email = userData.user.email
    if (!email) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json([], { status: 200 })

    const partner = await prisma.partner.findUnique({ where: { userId: user.id } })
    if (!partner) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!partner.approved) return NextResponse.json({ error: 'Partner not approved' }, { status: 403 })

    const students = await prisma.application.findMany({ where: { partnerId: partner.id }, orderBy: { createdAt: 'desc' } })
    return NextResponse.json(students)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    const email = userData.user.email
    if (!email) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ error: 'Invalid user' }, { status: 401 })

    const partner = await prisma.partner.findUnique({ where: { userId: user.id } })
    if (!partner) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    if (!partner.approved) return NextResponse.json({ error: 'Partner not approved' }, { status: 403 })

    const body = await request.json()
    const { applicantName, email: applicantEmail, phone, listingId } = body
    if (!applicantName || !applicantEmail) return NextResponse.json({ error: 'applicantName and email required' }, { status: 400 })

    const created = await prisma.application.create({ data: {
      applicantName,
      email: applicantEmail,
      phone: phone || null,
      listingId: listingId || null,
      partnerId: partner.id,
      status: 'PENDING'
    }})

    // audit log
    try {
      await prisma.auditLog.create({ data: { action: 'CREATE_APPLICATION', entity: 'Application', entityId: created.id, userId: user.id, userEmail: user.email, meta: { applicantName, applicantEmail } } })
    } catch (e) {
      console.warn('Failed to write audit for application create', e)
    }

    // send receipt email to applicant (best-effort)
    try {
      const { sendBookingConfirmed } = await import('../../../../lib/mailer')
      // reuse confirmation template to notify applicant of receipt
      await sendBookingConfirmed({ to: applicantEmail, name: applicantName, listingTitle: 'Application received', bookingId: created.id, appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' })
    } catch (e) {
      console.warn('mailer failed for application create', e)
    }

    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create application' }, { status: 500 })
  }
}
