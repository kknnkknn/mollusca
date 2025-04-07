import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized'}, { status: 401 })
  }

  const user = await prisma.user.findMany({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found'}, { status: 404 })
  }
  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
  const userId = 1 // 仮の ID
  const body = await req.json()

  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'Invalid title'}, { status: 400 })
  }

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      userId,
    }
  })
  return NextResponse.json(newTask, { status: 201 })
}

