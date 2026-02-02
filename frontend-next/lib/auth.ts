import { supabaseServer } from './supabaseServer'
import { prisma } from './prisma'

export async function getUserFromToken(token?: string) {
  if (!token) return { user: null }
  const { data, error } = await supabaseServer.auth.getUser(token)
  if (error) return { user: null, error }
  return { user: data.user }
}

export async function isAdminByEmail(email?: string) {
  if (!email) return false
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return false
  const admin = await prisma.admin.findUnique({ where: { userId: user.id } })
  return !!admin
}

export async function isAdminByUserId(userId?: string) {
  if (!userId) return false
  const admin = await prisma.admin.findUnique({ where: { userId } })
  return !!admin
}
