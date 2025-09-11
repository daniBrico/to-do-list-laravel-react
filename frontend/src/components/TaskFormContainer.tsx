import { useEffect, useState } from 'react'
import TodoForm from './TaskForm'
import Todo from './Task'
import type { Task, TaskID } from '@/types/types'
import TodoEditForm from './TaskEditForm'
import useGetTasks from '@/hooks/useGetTasks'
import useCreateTask from '@/hooks/useCreateTask'
import useDeleteTask from '@/hooks/useDeleteTask'
import { LoadingSpinner } from './LoadingSpinner'

const TodoFormContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const { tasksFromAPI, tasksIsLoading } = useGetTasks()
  const { createTask, taskFromAPI, taskIsLoading } = useCreateTask()
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

  const addTask = (todo: string): void => {
    createTask({ id: 0, task: todo, isCompleted: false })
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
    <div className="max-h-96 w-2xl rounded-md bg-zinc-800 p-8 shadow-md shadow-zinc-950">
      <TodoForm addTask={addTask} taskIsLoading={taskIsLoading} />
      <p className="mt-6 ml-2 text-base font-light text-zinc-400">Task list</p>
      <div className="flex max-h-48 min-h-48 flex-col gap-3 overflow-y-scroll rounded-sm bg-zinc-700/20 px-2 py-4">
        {tasksIsLoading ? (
          <div className="flex h-48 w-full flex-col items-center justify-center gap-2">
            <LoadingSpinner isLoading={tasksIsLoading} />
            <p className="text-base text-zinc-400">Cargando tareas</p>
          </div>
        ) : null}
        {tasks.map((todo, index) =>
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
        )}
      </div>
    </div>
  )
}

export default TodoFormContainer
