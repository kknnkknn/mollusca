import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import { title } from "process";

export async function GET(req: NextRequest) {
  const userId = 1 // 仮の ID
  const tasks = await prisma.task.findMany({
    where: { userId },
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

