import { TodoItem } from "../types"
import { TodoListItem } from "./TodoListItem"
import { Filter } from "../types"

interface TodoListProps {
  todos: TodoItem[]
  handleDeleteTodo: (id: string) => void
  handleToggleTodo: (id: string) => void
  filter: Filter
}

export const TodoList = ({
  todos,
  handleDeleteTodo,
  handleToggleTodo,
  filter,
}: TodoListProps) => {
  return (
    <ul style={{ width: "100%" }}>
      {todos
        .filter((todo) =>
          filter === "all"
            ? true
            : filter === "completed"
            ? todo.completed
            : !todo.completed
        )
        .map((todo) => (
          <li key={todo.id}>
            <TodoListItem
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleTodo={handleToggleTodo}
            />
          </li>
        ))}
    </ul>
  )
}
