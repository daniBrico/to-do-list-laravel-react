import { useEffect, useState } from 'react'
import TodoForm from './TaskForm'
import Todo from './Task'
import type { Task } from '@/types/types'
import TodoEditForm from './TaskEditForm'
import useGetTasks from '@/hooks/useGetTasks'
import useCreateTask from '@/hooks/useCreateTask'

const TodoFormContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const { tasksFromAPI } = useGetTasks()
  const { createTask, taskFromAPI, taskIsLoading } = useCreateTask()

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
    createTask({ task: todo, isCompleted: false })
  }

  const deleteTask = (id: string): void =>
    setTasks(tasks.filter((todo) => todo.id !== id))

  const editTodo = (id: string): void =>
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )

  const toggleComplete = (id: string): void =>
    setTasks(
      tasks.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )

  const editTask = (id: string, taskText: string): void =>
    setTasks(
      tasks.map((todo) =>
        todo.id === id
          ? { ...todo, task: taskText, isEditing: !todo.isEditing }
          : todo
      )
    )

  return (
    <div className="max-h-96 w-2xl rounded-md bg-zinc-800 p-8 shadow-md shadow-zinc-950">
      <TodoForm addTask={addTask} taskIsLoading={taskIsLoading} />
      <p className="mt-6 ml-2 text-base font-light text-zinc-400">Task list</p>
      {tasks.length > 0 ? (
        <div className="flex max-h-48 flex-col gap-3 overflow-y-scroll rounded-sm bg-zinc-700/20 px-2 py-4">
          {tasks.map((todo, index) =>
            todo.isEditing ? (
              <TodoEditForm key={index} editTask={editTask} todo={todo} />
            ) : (
              <Todo
                key={index}
                todo={todo}
                deleteTask={deleteTask}
                editTodo={editTodo}
                toggleComplete={toggleComplete}
              />
            )
          )}
        </div>
      ) : null}
    </div>
  )
}

export default TodoFormContainer
