import { NextResponse } from 'next/server'
import { supabaseServer } from '../../../../lib/supabaseServer'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const body = await request.json()
    const name = body?.name || null
    const email = userData.user.email
    if (!email) return NextResponse.json({ error: 'User email missing' }, { status: 400 })

    // ensure the user exists in our Prisma users table
    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      user = await prisma.user.create({ data: { email, name: userData.user.user_metadata?.full_name || null } })
    }

    // create or update Partner entry
    const existing = await prisma.partner.findUnique({ where: { userId: user.id } })
    if (existing) {
      const updated = await prisma.partner.update({ where: { id: existing.id }, data: { name: name || existing.name } })
      return NextResponse.json(updated)
    }

    // create partner in unapproved state; admin must approve
    const partner = await prisma.partner.create({ data: { userId: user.id, name, approved: false } })
    return NextResponse.json({ partner, message: 'Partner registered and pending admin approval' }, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to register partner' }, { status: 500 })
  }
}
