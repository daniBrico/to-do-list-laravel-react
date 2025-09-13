declare((strict_types = 1))

export type TaskID = number

// Todo types
export interface TaskType {
  id: TaskID
  text: string
  isCompleted: boolean
  isEditing: boolean
}

export type TaskAPI = Omit<TaskType, 'isEditing'>
