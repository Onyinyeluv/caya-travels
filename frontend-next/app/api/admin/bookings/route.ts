import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { supabaseServer } from '../../../lib/supabaseServer'

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userData, error: userError } = await supabaseServer.auth.getUser(token)
    if (userError || !userData?.user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const email = userData.user.email
    // require admin
    const isAdmin = !!(await prisma.admin.findFirst({ where: { email } }))
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || '1')
    const perPage = Number(url.searchParams.get('perPage') || '20')
    const status = url.searchParams.get('status') || undefined
    const q = url.searchParams.get('q') || undefined

    const where: any = {}
    if (status) where.status = status
    if (q) {
      where.OR = [
        { listing: { title: { contains: q, mode: 'insensitive' } } },
        { user: { email: { contains: q, mode: 'insensitive' } } }
      ]
    }

    const total = await prisma.booking.count({ where })
    const bookings = await prisma.booking.findMany({
      where,
      include: { listing: true, user: true },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * perPage,
      take: perPage
    })

    return NextResponse.json({ bookings, total, page, perPage })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
