import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import type { Task } from '@/types/types'

interface TodoEditFormProps {
  editTask: (todoId: string, taskText: string) => void
  todo: Task
}

const TodoEditForm: React.FC<TodoEditFormProps> = ({ editTask, todo }) => {
  const [inputValue, setInputValue] = useState(todo.task)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    editTask(todo.id, inputValue)

    setInputValue('')
  }

  useEffect(() => {
    if (inputRef === null || inputRef.current === null) return

    inputRef.current.focus()
  }, [])

  const handleTaskInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setInputValue(e.target.value)

  return (
    <form
      action=""
      className="flex items-center gap-4"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        type="text"
        value={inputValue}
        placeholder="Type Task"
        ref={inputRef}
        className="border-zinc-800 bg-zinc-900/60 py-5 pl-4 text-white shadow-md shadow-zinc-900 transition-all duration-300 ease-out placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-0 focus-visible:ring-zinc-700"
        onChange={(e) => handleTaskInputOnChange(e)}
      />
      <Button
        type="submit"
        className="cursor-pointer border border-zinc-800 bg-zinc-900/60 text-zinc-300 shadow-md shadow-zinc-900 transition-all duration-300 ease-in-out hover:bg-zinc-900"
      >
        Edit Task
      </Button>
    </form>
  )
}

export default TodoEditForm
