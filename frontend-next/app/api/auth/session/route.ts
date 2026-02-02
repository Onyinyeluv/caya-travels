import { NextResponse } from 'next/server'
import { getUserFromToken } from '../../../../lib/auth'

export async function GET(request: Request) {
  try {
    const auth = request.headers.get('authorization') || ''
    const token = auth.split(' ')[1]
    if (!token) return NextResponse.json({ user: null })

    const { user } = await getUserFromToken(token)
    return NextResponse.json({ user: user || null })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ user: null })
  }
}
