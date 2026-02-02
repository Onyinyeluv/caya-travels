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

    const listings = await prisma.listing.findMany({ where: { ownerId: user.id } })
    return NextResponse.json(listings)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch partner listings' }, { status: 500 })
  }
}
