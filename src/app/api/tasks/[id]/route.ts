import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.id, 10)
  const body = await req.json()
  
  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: body.title,
    },
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const taskId = parseInt(params.id, 10)

  await prisma.task.delete({
    where: { id: taskId },
  })

  return NextResponse.json({ message: 'Task deleted successfully' })
}
