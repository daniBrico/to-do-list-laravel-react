declare((strict_types = 1))

export type TaskID = number

// Todo types
export interface Task {
  id: TaskID
  task: string
  isCompleted: boolean
  isEditing: boolean
}

export type TaskAPI = Omit<Task, 'isEditing'>
