import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function POST() {
  if (process.env.NODE_ENV !== 'test') {
    return NextResponse.json({ error: 'Not allowed'}, { status: 403 })
  }

  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  })

  if (!user) {
    return NextResponse.json({ error: 'Test user not found'}, { status: 404 })
  }

  const session = await getServerSession(authOptions)
  cookies().set('next-auth.session-token', 'dummy-session-token')

  return NextResponse.json({ ok: true })
}

