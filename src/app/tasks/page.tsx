"use client"
import React, { useEffect, useState } from 'react'
import { cookies } from 'next/headers'
import { Task } from '@prisma/client'

async function fetchTasks(): Promise<Task[]> {
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
  const [tasks, setTasks] = useState<Task[]>([])
  const [editngjTaskId, setEditngTaskId] = useState<number | null>(null)
  const [editingTitle, setEditangTitle] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')

  useEffect(() =>{
    fetchTasks().then(setTasks)
  },[])
  
  const handleAddTask = async () => {
    if (!newTaskTitle) return;
    
    const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: newTaskTitle })
    });
    if (res.ok) {
      const addedTask = await res.json()
      setTasks([...tasks, addedTask])
      setNewTaskTitle('')
    } else {
      alert('タスクを追加できませんでした');
    }
  }
  const handleEditTask = async (id: number) => {
    if (!editingTitle) return

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editingTitle })
      })
      if (res.ok) {
        setTasks(tasks.map(task => (task.id == id ? { ...task, title: editingTitle } : task)))
        setEditngTaskId(null)
        setEditangTitle('')
      } else {
        alert('タスクを更新できませんでした')
      }
  }

  const handleDeleteTask = async (id: number) => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/tasks/${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      setTasks(tasks.filter(task => task.id !== id))
    } else {
      alert('タスクを削除できませんでした')
    }
  }
  return (
    <div className='max-w-2x1 mx-auto mt-8'>
      <h1 className='text-3x1 font-bold mb-6'>タスク一覧</h1>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className='flex justify-between items-center border-b last:border-0 p-4'
            >
              {editngjTaskId === task.id ? (
                <>
                  <input
                    className='border rounded px-2 py-1 flex-1 mr-2'
                    value={editingTitle}
                    onChange={(e) => setEditangTitle(e.target.value)}
                  />
                  <button
                    onClick={() => handleEditTask(task.id)}
                    className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm'>保存</button>
                </>
              ) : (
                <>
                  <span className='text-lg font-medium'>{task.title}</span>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => {
                        setEditngTaskId(task.id)
                        setEditangTitle(task.title)
                      }}
                      className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm'>編集</button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm'>削除</button>
                  </div>
                </>
              )}
          </li>
          ))}
        </ul>
      </div>
      <div className='mt-6'>
        <input type='text' 
          placeholder='新しいタスク名' className='border rounded-lg px-3 py-2 w-full'
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button 
          onClick={handleAddTask}
          className='mt-3 bg-green-500 hover:bg-gren-600 text-white px-4 py-2 rounded-lg'>タスク追加</button>
      </div>
    </div>
  )
}

