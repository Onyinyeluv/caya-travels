import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getUserFromToken, isAdminByUserId } from '../../../../lib/auth'

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { user } = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const isAdmin = await isAdminByUserId(user.id)
    if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page') || '1'))
    const pageSize = Math.min(100, Math.max(1, Number(url.searchParams.get('pageSize') || '20')))

    const where: any = {}
    const actionFilter = url.searchParams.get('action')
    const entityFilter = url.searchParams.get('entity')
    if (actionFilter) where.action = actionFilter
    if (entityFilter) where.entity = entityFilter

    const total = await prisma.auditLog.count({ where })
    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return NextResponse.json({ total, page, pageSize, logs })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
  }
}
