import { deleteTask } from '@/services/task'
import type { TaskID } from '@/types/types'
import { useState } from 'react'

interface useDeleteTask {
  deleteTaskError: Error | null
  deleteTaskIsLoading: boolean
  deleteTaskFromAPI: (task: TaskID) => Promise<boolean>
}

const useDeleteTask = (): useDeleteTask => {
  const [deleteTaskError, setDeleteTaskError] = useState<Error | null>(null)
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState<boolean>(false)

  const deleteTaskFromAPI = async (task: TaskID): Promise<boolean> => {
    setDeleteTaskIsLoading(true)

    try {
      const succes = await deleteTask(task)

      if (!succes)
        throw new Error('No se pudo eliminar la tarea en el servidor.')

      return true
    } catch (error) {
      setDeleteTaskError(error as Error)
      return false
    } finally {
      setDeleteTaskIsLoading(false)
    }
  }

  return { deleteTaskError, deleteTaskIsLoading, deleteTaskFromAPI }
}

export default useDeleteTask
