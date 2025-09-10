import type { Task, TaskAPI } from '@/types/types'
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

export const setTask = async (task: TaskAPI): Promise<Task | null> => {
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
