import { getTasks } from '@/services/task'
import type { Task } from '@/types/types'
import { useEffect, useState } from 'react'

interface useGetTasksReturn {
  tasksFromAPI: Task[]
  tasksError: Error | null
  tasksIsLoading: boolean
}

const useGetTasks = (): useGetTasksReturn => {
  const [tasksFromAPI, setTasksFromAPI] = useState<Task[]>([])
  const [tasksError, setTasksError] = useState<Error | null>(null)
  const [tasksIsLoading, setTasksIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      try {
        setTasksIsLoading(true)

        const apiTasks = await getTasks()

        setTasksFromAPI(apiTasks)
      } catch (error) {
        setTasksError(error as Error)
      } finally {
        setTasksIsLoading(false)
      }
    }

    fetchTasks()
  }, [])

  return { tasksFromAPI, tasksError, tasksIsLoading }
}

export default useGetTasks
