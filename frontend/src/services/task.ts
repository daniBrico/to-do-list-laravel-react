import type { Task, TaskAPI, TaskID } from '@/types/types'
import api from './api'

export interface ResponseGetTasks {
  tasks: TaskAPI[]
  status: number
}

export const getTasks = async (): Promise<Task[]> => {
  const res = await api<ResponseGetTasks>('api/tasks')

  if (res === null) return []

  const tasks: Task[] = res.tasks.map((taskAPI) => {
    return { ...taskAPI, isEditing: false }
  })

  return tasks
}

export interface ResponseSetTask {
  task: TaskAPI
  status: number
}

export const createTask = async (task: TaskAPI): Promise<Task | null> => {
  const res = await api<ResponseSetTask>('api/task', {
    method: 'POST',
    body: JSON.stringify(task)
  })

  if (res === null) return null

  const taskFromAPI = res.task

  const newTask: Task = {
    id: taskFromAPI.id,
    task: taskFromAPI.task,
    isCompleted: taskFromAPI.isCompleted,
    isEditing: false
  }

  return newTask
}

interface deleteTaskResponse {
  message: string
  status: number
}

export const deleteTask = async (id: TaskID): Promise<boolean> => {
  const res = await api<deleteTaskResponse>(`api/tasks/${id}`, {
    method: 'DELETE'
  })

  return res?.status === 200
}
