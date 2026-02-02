import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { supabaseServer } from '../../../../lib/supabaseServer'

export async function GET(request: Request) {
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
    const page = Number(url.searchParams.get('page') || '1')
    const perPage = Number(url.searchParams.get('perPage') || '20')
    const q = url.searchParams.get('q') || undefined

    const where: any = {}
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { user: { email: { contains: q, mode: 'insensitive' } } }
      ]
    }

    const total = await prisma.partner.count({ where })
    const partners = await prisma.partner.findMany({ where, include: { user: true }, orderBy: { createdAt: 'desc' }, skip: (page - 1) * perPage, take: perPage })

    return NextResponse.json({ partners, total, page, perPage })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 })
  }
}
