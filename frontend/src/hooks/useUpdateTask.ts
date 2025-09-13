import { updateTask } from '@/services/task'
import type { TaskAPI } from '@/types/types'
import { useState } from 'react'

interface useUpdateTaskReturn {
  updateSelectedTask: (task: TaskAPI) => Promise<boolean>
  updateTaskError: Error | null
  updateTaskIsLoading: boolean
  setUpdateTaskError: React.Dispatch<React.SetStateAction<Error | null>>
}

const useUpdateTask = (): useUpdateTaskReturn => {
  const [updateTaskError, setUpdateTaskError] = useState<Error | null>(null)
  const [updateTaskIsLoading, setUpdateTaskIsLoading] = useState<boolean>(false)

  const updateSelectedTask = async (task: TaskAPI): Promise<boolean> => {
    setUpdateTaskIsLoading(true)

    try {
      console.log('🚀 ~ updateSelectedTask ~ task: ', task)
      const success = await updateTask(task)

      if (!success)
        throw new Error('No se pudo actualizar la tarea en el servidor')

      return true
    } catch (error) {
      setUpdateTaskError(error as Error)
      return false
    } finally {
      setUpdateTaskIsLoading(false)
    }
  }

  return {
    updateSelectedTask,
    updateTaskError,
    updateTaskIsLoading,
    setUpdateTaskError
  }
}

export default useUpdateTask
