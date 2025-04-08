import React from 'react'
async function getTasks() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('タスク取得エラー')
  }

  return res.json()
}
export default async function TasksPage() {
  const tasks = await getTasks()
  return (
    <div className='max-w-2x1 mx-auto mt-8'>
      <h1 className='text-3x1 font-bold mb-6'>タスク一覧</h1>
      <ul className='bg-white shadow-md rounded-1g overflow-hidden'>
      {tasks.map((task: any) =>(
        <li key={task.id} className='border-b p-4 flex justify-between items-center'>
          <span>{task.title}</span>
          <button className='text-red-500'>削除</button>
        </li>
      ))}
      </ul>
    </div>
  )
}

