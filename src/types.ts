export type TodoItem = {
  id: string
  content: string
  completed: boolean
}

export type Filter = "all" | "completed" | "incomplete"
