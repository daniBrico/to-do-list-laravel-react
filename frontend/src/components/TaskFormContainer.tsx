import { useEffect, useState } from 'react'
import TaskForm from './TaskForm'
import Todo from './Task'
import type { Task, TaskID } from '@/types/types'
import TodoEditForm from './TaskEditForm'
import useGetTasks from '@/hooks/useGetTasks'
import useCreateTask from '@/hooks/useCreateTask'
import useDeleteTask from '@/hooks/useDeleteTask'
import { LoadingSpinner } from './LoadingSpinner'
import CreateNewTaskMessage from './CreateNewTaskMessage'

const TaskFormContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [displayMessage, setDisplayMessage] = useState(false)

  const { tasksFromAPI, tasksIsLoading } = useGetTasks()
  const {
    newTask,
    taskFromAPI,
    taskIsLoading,
    createTaskError,
    setCreateTaskError
  } = useCreateTask()
  const { deleteTaskError, deleteTaskFromAPI } = useDeleteTask()

  useEffect(() => {
    if (tasksFromAPI.length === 0) return

    setTasks(tasksFromAPI)
  }, [tasksFromAPI])

  useEffect(() => {
    if (taskFromAPI === null) return

    setTasks([
      ...tasks,
      {
        id: taskFromAPI.id,
        task: taskFromAPI.task,
        isCompleted: false,
        isEditing: false
      }
    ])
  }, [taskFromAPI])

  useEffect(() => {
    if (!displayMessage) return

    const timeout = setTimeout(() => {
      setDisplayMessage(false)

      const timeoutTwo = setTimeout(() => {
        setCreateTaskError(null)
      }, 1000)

      return (): void => clearTimeout(timeoutTwo)
    }, 3000)

    return (): void => {
      clearTimeout(timeout)
    }
  }, [displayMessage, taskIsLoading])

  const addTask = (todo: string): void => {
    newTask({ id: 0, task: todo, isCompleted: false })
    setDisplayMessage(true)
  }

  const deleteTask = async (id: TaskID): Promise<void> => {
    const wasTaskDeleted = await deleteTaskFromAPI(id)

    if (wasTaskDeleted) {
      setTasks(tasks.filter((todo) => todo.id !== id))
      return
    }

    console.error(deleteTaskError?.message || 'No se pudo eliminar la tarea.')
  }

  const changeTaskIsEditing = (id: TaskID): void =>
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )

  const toggleComplete = (id: TaskID): void =>
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )

  const editTask = (id: TaskID, taskText: string): void => {
    // Tengo el id y el nuevo texto de la tarea que debo modificar

    setTasks(
      tasks.map((todo) =>
        todo.id === id
          ? { ...todo, task: taskText, isEditing: !todo.isEditing }
          : todo
      )
    )
  }

  return (
    <div className="relative max-h-96 w-2xl rounded-md bg-zinc-800 p-8 shadow-md shadow-zinc-950">
      <TaskForm
        addTask={addTask}
        taskIsLoading={taskIsLoading}
        createTaskError={createTaskError}
      />
      <CreateNewTaskMessage
        textMessage={
          createTaskError === null
            ? 'La tarea se agregó exitosamente'
            : 'Ocurrió un error al agregar la tarea'
        }
        displayMessage={displayMessage}
        taskIsLoading={taskIsLoading}
      />

      <p className="mt-12 ml-2 text-base font-light text-zinc-400">Task list</p>
      <div className="scrollbar-styles flex max-h-48 min-h-48 flex-col gap-3 overflow-y-scroll rounded-sm bg-zinc-700/20 px-2 py-4">
        {tasksIsLoading ? (
          <div className="flex h-48 w-full flex-col items-center justify-center gap-2">
            <LoadingSpinner isLoading={tasksIsLoading} />
            <p className="text-base text-zinc-400">Cargando tareas</p>
          </div>
        ) : null}
        {tasks.length > 0
          ? tasks.map((todo, index) =>
              todo.isEditing ? (
                <TodoEditForm key={index} editTask={editTask} todo={todo} />
              ) : (
                <Todo
                  key={index}
                  todo={todo}
                  deleteTask={deleteTask}
                  changeTaskIsEditing={changeTaskIsEditing}
                  toggleComplete={toggleComplete}
                />
              )
            )
          : !tasksIsLoading && (
              <div className="flex h-48 w-full flex-col items-center justify-center gap-2">
                <p className="rounded-md bg-zinc-600/20 px-4 py-2 text-base text-zinc-400">
                  No hay tareas cargadas
                </p>
              </div>
            )}
      </div>
    </div>
  )
}

export default TaskFormContainer
