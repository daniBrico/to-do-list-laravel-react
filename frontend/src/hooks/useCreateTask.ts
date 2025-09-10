import { setTask } from '@/services/task'
import type { TaskAPI } from '@/types/types'
import { useState } from 'react'

interface useCreateTaskReturn {
  taskFromAPI: TaskAPI | null
  taskError: Error | null
  taskIsLoading: boolean
  createTask: (task: TaskAPI) => Promise<void>
}

const useCreateTask = (): useCreateTaskReturn => {
  const [taskFromAPI, setTaskFromAPI] = useState<TaskAPI | null>(null)
  const [taskError, setTaskError] = useState<Error | null>(null)
  const [taskIsLoading, setTaskIsLoading] = useState<boolean>(false)

  const createTask = async (task: TaskAPI): Promise<void> => {
    setTaskIsLoading(true)

    try {
      const apiTask = await setTask(task)

      setTaskFromAPI(apiTask)
    } catch (error) {
      setTaskError(error as Error)
    } finally {
      setTaskIsLoading(false)
    }
  }

  return { createTask, taskFromAPI, taskError, taskIsLoading }
}

export default useCreateTask
