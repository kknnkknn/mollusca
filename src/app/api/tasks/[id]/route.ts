import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'

export async function PUT(req: NextRequest, context: { params: { id: string }}) {
  const { id } = await context.params
  const taskId = parseInt(id, 10)
  const body = await req.json()

  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400 })
  }
  
  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }

  const existingTask = await prisma.task.findUnique({ where: { id: taskId } })
  if (!existingTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: body.title,
    },
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params
  const taskId = parseInt(id, 10)

  // idが無効な場合のチェック
  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400 })
  }

  // 存在確認（安全のため）
  const existingTask = await prisma.task.findUnique({ where: { id: taskId } })
  if (!existingTask) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }

  // タスク削除
  await prisma.task.delete({ where: { id: taskId } })

  return NextResponse.json({ message: 'Task deleted successfully' })
}
