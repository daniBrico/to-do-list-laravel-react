import type { Response, Task } from '@/types/types'
import api from './api'

export const getTasks = async (): Promise<Task[]> => {
  const res = await api<Response>('api/tasks')

  if (res === null) return []

  const tasks: Task[] = res.tasks.map((taskAPI) => {
    return { ...taskAPI, isEditing: false }
  })

  return tasks
}
