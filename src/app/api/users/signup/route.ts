import { NextRequest, NextResponse } from "next/server";
import { prisma }  from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  
  if(!email || !password || typeof email !== "string" || typeof password !== 'string') {
    return NextResponse.json({ error: 'Wrong password or e-mail address'}, { status: 400 })
  }

  const trimmedEmail = email.trim()

  const existingUser = await prisma.user.findUnique({ where: { email: trimmedEmail }})

  if (existingUser) {
    return NextResponse.json({ error: 'This e-mail address is already registered' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: trimmedEmail,
      hashedPassword,
    },
  })

  return NextResponse.json({ id: newUser.id, email: newUser.email }, { status: 201 })
}
