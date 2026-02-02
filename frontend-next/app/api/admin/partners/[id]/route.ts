import { NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { supabaseServer } from '../../../../../lib/supabaseServer'

export async function PATCH(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const email = userData.user.email
    const isAdmin = !!(await prisma.admin.findFirst({ where: { email } }))
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const url = new URL(request.url)
    const id = url.pathname.split('/').pop()
    if (!id) return NextResponse.json({ error: 'Missing partner id' }, { status: 400 })

    const body = await request.json()
    const { approved } = body
    if (typeof approved !== 'boolean') return NextResponse.json({ error: 'approved boolean required' }, { status: 400 })

    const data: any = { approved }
    if (approved) data.approvedAt = new Date()
    else data.approvedAt = null

    const updated = await prisma.partner.update({ where: { id }, data })

    // optional: send notification to partner user
    try {
      const user = await prisma.user.findUnique({ where: { id: updated.userId } })
      if (user && user.email) {
        const { sendGeneric } = await import('../../../../../lib/mailer')
        const subject = approved ? 'Partner approved' : 'Partner application rejected'
        const bodyText = approved ? 'Your partner account has been approved.' : 'Your partner application was not approved.'
        await sendGeneric({ to: user.email, subject, text: bodyText })
      }
    } catch (e) {
      console.warn('Failed to notify partner on approval change', e)
    }

    return NextResponse.json(updated)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 })
  }
}
