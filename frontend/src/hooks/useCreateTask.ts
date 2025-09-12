import { createTask } from '@/services/task'
import type { TaskAPI } from '@/types/types'
import { useState } from 'react'

interface useCreateTaskReturn {
  taskFromAPI: TaskAPI | null
  createTaskError: Error | null
  taskIsLoading: boolean
  newTask: (task: TaskAPI) => Promise<void>
}

const useCreateTask = (): useCreateTaskReturn => {
  const [taskFromAPI, setTaskFromAPI] = useState<TaskAPI | null>(null)
  const [createTaskError, setCreateTaskError] = useState<Error | null>(null)
  const [taskIsLoading, setTaskIsLoading] = useState<boolean>(false)

  const newTask = async (task: TaskAPI): Promise<void> => {
    setTaskIsLoading(true)

    try {
      const apiTask = await createTask(task)

      setTaskFromAPI(apiTask)
    } catch (error) {
      setCreateTaskError(error as Error)
    } finally {
      setTaskIsLoading(false)
    }
  }

  return { newTask, taskFromAPI, createTaskError, taskIsLoading }
}

export default useCreateTask
