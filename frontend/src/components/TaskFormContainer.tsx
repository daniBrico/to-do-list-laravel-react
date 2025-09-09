import { useEffect, useState } from 'react'
import TodoForm from './TaskForm'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Task'
import type { Task } from '@/types/types'
import TodoEditForm from './TaskEditForm'
import useGetTasks from '@/hooks/useGetTasks'

const TodoFormContainer: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const { tasksFromAPI } = useGetTasks()

  const addTodo = (todo: string): void => {
    setTasks([
      ...tasks,
      { id: uuidv4(), task: todo, isCompleted: false, isEditing: false }
    ])
  }

  useEffect(() => {
    if (tasksFromAPI.length === 0) return

    setTasks(tasksFromAPI)
  }, [tasksFromAPI])

  const deleteTodo = (id: string): void =>
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
    <div className="w-2xl rounded-md bg-zinc-800 p-8 shadow-md shadow-zinc-950">
      <TodoForm addTodo={addTodo} />
      {tasks.length > 0 ? (
        <div className="mt-6 flex flex-col gap-2">
          {tasks.map((todo, index) =>
            todo.isEditing ? (
              <TodoEditForm key={index} editTask={editTask} todo={todo} />
            ) : (
              <Todo
                key={index}
                todo={todo}
                deleteTodo={deleteTodo}
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
