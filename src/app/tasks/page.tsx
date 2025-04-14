import React from 'react'
import { cookies } from 'next/headers'

async function getTasks() {
  const cookieStore = cookies()
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks`, {
    headers: {
      Cookie: cookieStore.toString()
    },
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
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <ul>
          {tasks.map((task) => {
            <li
              key={task.id}
              className='flex justify-between items-center border-b last:border-0 p-4'
            >
            <span className='text-lg font-medium'>{task.title}</span>
            <div className='flex gap-2'>
               <button
                 className='bg-blue-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm'>削除</button>
            </div>
          </li>
          })}
        </ul>
      </div>
      <div className='mt-6'>
        <input type='text' placeholder='新しいタスク名' className='border rounded-lg px-3 py-2 w-full'/>
        <button className='mt-3 bg-green-500 hover:bg-gren-600 text-white px-4 py-2 rounded-lg'>タスク追加</button>
      </div>
    </div>
  );
}

