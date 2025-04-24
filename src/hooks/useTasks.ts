import { useState, useEffect, useCallback } from "react"; 
import { Task } from "@prisma/client";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const fetchTasks = useCallback(async () => {
    const res = await fetch('/api/tasks', { cache: 'no-store' })
    if (res.ok) setTasks(await res.json())
  }, [])


  useEffect(() => { fetchTasks() }, [fetchTasks])

  const addTask = async (title: string) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (res.ok) setTasks([...tasks, await res.json()])
  }

  const updateTask = async (id: number, title: string) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    if (res.ok) setTasks(tasks.map(t => (t.id === id ? { ...t, title}: t)))
  }
  
  const deleteTask = async (id: number) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) setTasks(tasks.filter(t => t.id !== id))
  }

  return { tasks, addTask, updateTask, deleteTask}
}
