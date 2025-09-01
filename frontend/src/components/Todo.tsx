import classNames from 'classnames'
import type { TodoType } from '@/types/types'
import EditIconSvg from './svg/EditIconSvg'
import TrashIconSvg from './svg/TrashIconSvg'
import { Checkbox } from './ui/checkbox'

interface TodoProps {
  todo: TodoType
  deleteTodo: (id: string) => void
  editTodo: (id: string) => void
  toggleComplete: (id: string) => void
}

const Todo: React.FC<TodoProps> = ({
  todo,
  deleteTodo,
  editTodo,
  toggleComplete
}) => {
  const handleDeleteTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation()
    deleteTodo(todo.id)
  }

  const handleEditTodo = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation()
    editTodo(todo.id)
  }

  return (
    <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900/60 px-4 py-2 shadow-md shadow-zinc-900">
      <div className="flex items-center gap-2">
        <Checkbox
          onCheckedChange={() => toggleComplete(todo.id)}
          className="h-5 w-5 cursor-pointer"
        />
        <p
          className={classNames('text-base font-normal text-zinc-300', {
            'line-through opacity-60': todo.completed
          })}
        >
          {todo.task}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => handleEditTodo(e)}
          className="w-6 cursor-pointer text-slate-500 transition-all duration-300 ease-in-out hover:scale-110 hover:text-slate-400"
        >
          <EditIconSvg />
        </button>
        <p className="text-base text-zinc-600">|</p>
        <button
          onClick={(e) => handleDeleteTodo(e)}
          className="w-6 cursor-pointer text-slate-500 transition-all duration-300 ease-in-out hover:scale-110 hover:text-slate-400"
        >
          <TrashIconSvg />
        </button>
      </div>
    </div>
  )
}

export default Todo
