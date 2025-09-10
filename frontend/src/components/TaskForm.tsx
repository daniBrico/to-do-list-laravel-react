import { useState, type FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { LoadingSpinner } from './LoadingSpinner'

interface TodoFormProps {
  addTask: (todo: string) => void
  taskIsLoading: boolean
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask, taskIsLoading }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    addTask(inputValue)
    setInputValue('')
  }

  const handleTaskInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => setInputValue(e.target.value)

  return (
    <form
      action=""
      className="flex items-center gap-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        type="text"
        value={inputValue}
        placeholder="Type task"
        className="max-w-3/4 border-zinc-800 bg-zinc-900/60 py-5 pl-4 text-zinc-300 shadow-md shadow-zinc-900 transition-all duration-300 ease-out placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-0 focus-visible:ring-zinc-700"
        onChange={(e) => handleTaskInputOnChange(e)}
      />
      <Button
        type="submit"
        className="cursor-pointer border border-zinc-800 bg-zinc-900/60 text-zinc-300 shadow-md shadow-zinc-900 transition-all duration-300 ease-in-out hover:bg-zinc-900"
      >
        Add Task
      </Button>
      <LoadingSpinner isLoading={taskIsLoading} />
    </form>
  )
}

export default TodoForm
