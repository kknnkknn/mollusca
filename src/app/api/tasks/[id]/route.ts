import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req: NextRequest, { params }: { params: { id: string }}) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  const { id } = await params
  const taskId = parseInt(id, 10)

  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400 })
  }

  const body = await req.json()
  
  if (!body.title || typeof body.title !== 'string') {
    return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
  }

  const updatedTask = await prisma.task.update({ 
    where: { id: taskId, userId: user.id },
    data: { title: body.title }
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized'}, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  const { id } = await params

  const taskId = parseInt(id, 10)

  // idが無効な場合のチェック
  if (isNaN(taskId)) {
    return NextResponse.json({ error: 'Invalid Task ID' }, { status: 400 })
  }

  const deletedTask = await prisma.task.delete({ 
    where: { id: taskId, userId: user.id } 
  })

  return NextResponse.json(deletedTask)
}
