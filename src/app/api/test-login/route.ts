import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { encode } from 'next-auth/jwt'
import { EncryptJWT, SignJWT } from 'jose'

export async function POST() {
  console.log('IS_TEST: ', process.env.IS_TEST)
  if (process.env.IS_TEST !== 'true') {
    return NextResponse.json({ error: 'Not allowed'}, { status: 403 })
  }

  const user = await prisma.user.findUnique({
    where: { email: 'test@example.com' }
  })

  if (!user) {
    return NextResponse.json({ error: 'Test user not found'}, { status: 404 })
  }

  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
  
  // const token = await new EncryptJWT({
  //   user: { id: user.id, email: user.email }
  // })
  //   .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
  //   .setIssuedAt()
  //   .setExpirationTime('1h')
  //   .encrypt(secret)
  const token = await encode({
    secret: process.env.NEXTAUTH_SECRET!,
    token: {
      user: { id: user.id, email: user.email },
      sub: String(user.id),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600,
    },
    maxAge: 3600,
  })

  const response = NextResponse.json({ ok: true })

  response.cookies.set('next-auth.session-token', token, {
    httpOnly: true,
    path: '/',
    secure: false,
    sameSite: 'lax',
    maxAge: 3600,
  })

  return response
}

