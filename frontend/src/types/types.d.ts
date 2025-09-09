declare((strict_types = 1))

// Todo types
export interface Task {
  id: string
  task: string
  isCompleted: boolean
  isEditing: boolean
}

export type TaskAPI = Omit<Task, 'isEditing'>

export interface Response {
  tasks: TaskAPI[]
  status: number
}
