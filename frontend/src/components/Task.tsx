import classNames from 'classnames'
import type { Task } from '@/types/types'
import EditIconSvg from './svg/EditIconSvg'
import TrashIconSvg from './svg/TrashIconSvg'
import { Checkbox } from './ui/checkbox'

interface TodoProps {
  todo: Task
  deleteTask: (id: string) => void
  editTodo: (id: string) => void
  toggleComplete: (id: string) => void
}

const Todo: React.FC<TodoProps> = ({
  todo,
  deleteTask,
  editTodo,
  toggleComplete
}) => {
  const handleDeleteTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation()
    deleteTask(todo.id)
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
          checked={todo.isCompleted}
        />
        <p
          className={classNames('text-base font-light text-zinc-300', {
            'line-through opacity-60': todo.isCompleted
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
          onClick={(e) => handleDeleteTask(e)}
          className="w-6 cursor-pointer text-slate-500 transition-all duration-300 ease-in-out hover:scale-110 hover:text-slate-400"
        >
          <TrashIconSvg />
        </button>
      </div>
    </div>
  )
}

export default Todo
