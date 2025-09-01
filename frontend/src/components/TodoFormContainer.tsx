import { useState } from 'react'
import TodoForm from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import Todo from './Todo'
import type { TodoType } from '@/types/types'
import TodoEditForm from './TodoEditForm'

const TodoFormContainer: React.FC = () => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const addTodo = (todo: string): void => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false }
    ])
  }

  const deleteTodo = (id: string): void =>
    setTodos(todos.filter((todo) => todo.id !== id))

  const editTodo = (id: string): void =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )

  const toggleComplete = (id: string): void =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )

  const editTask = (id: string, taskText: string): void =>
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: taskText, isEditing: !todo.isEditing }
          : todo
      )
    )

  return (
    <div className="w-2xl rounded-md bg-zinc-800 p-8 shadow-md shadow-zinc-950">
      <TodoForm addTodo={addTodo} />
      {todos.length > 0 ? (
        <div className="mt-6 flex flex-col gap-2">
          {todos.map((todo, index) =>
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
