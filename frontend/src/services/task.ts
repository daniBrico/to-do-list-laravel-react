import type { TaskType, TaskAPI, TaskID } from '@/types/types'
import api from './api'

export interface ResponseGetTasks {
  tasks: TaskAPI[]
  status: number
}

export const getTasks = async (): Promise<TaskType[]> => {
  const res = await api<ResponseGetTasks>('api/tasks')

  if (res === null) return []

  const tasks: TaskType[] = res.tasks.map((taskAPI) => {
    return { ...taskAPI, isEditing: false }
  })

  return tasks
}

export interface ResponseSetTask {
  task: TaskAPI
  status: number
}

export const createTask = async (task: TaskAPI): Promise<TaskType | null> => {
  const res = await api<ResponseSetTask>('api/task', {
    method: 'POST',
    body: JSON.stringify(task)
  })

  if (res === null) return null

  const taskFromAPI = res.task

  const newTask: TaskType = {
    id: taskFromAPI.id,
    text: taskFromAPI.text,
    isCompleted: taskFromAPI.isCompleted,
    isEditing: false
  }

  return newTask
}

interface messageAndStatusResponse {
  message: string
  status: number
}

export const deleteTask = async (id: TaskID): Promise<boolean> => {
  const res = await api<messageAndStatusResponse>(`api/tasks/${id}`, {
    method: 'DELETE'
  })

  return res?.status === 200
}

export const updateTask = async (task: TaskAPI): Promise<boolean> => {
  const res = await api<messageAndStatusResponse>(`api/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify(task)
  })

  return res?.status === 200
}
