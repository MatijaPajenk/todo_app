export type TodoItem = {
  id: number
  content: string
  completed: boolean
}

export type Filter = "all" | "completed" | "incomplete"
