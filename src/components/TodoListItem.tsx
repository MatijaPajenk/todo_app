import { TodoItem } from "../types"
import { Checkbox, FlexGrid, Row } from "@carbon/react"
import { TrashCan } from "@carbon/icons-react"

interface TodoListItemProps {
  todo: TodoItem
  handleDeleteTodo: (id: number) => void
  handleToggleTodo: (id: number) => void
}

export const TodoListItem = ({
  todo,
  handleDeleteTodo,
  handleToggleTodo,
}: TodoListItemProps) => (
  <div
    style={{
      padding: "1em",
      backgroundColor: todo.completed ? "#f0f0f0" : "white",
    }}>
    <FlexGrid>
      <Row>
        <Checkbox
          name={`${todo.id}`}
          id={`${todo.id}`}
          onChange={() => handleToggleTodo(todo.id)}
          checked={todo.completed}
          labelText={todo.content}
        />
        <TrashCan
          color="red"
          cursor={"pointer"}
          onClick={() => handleDeleteTodo(todo.id)}
        />
      </Row>
    </FlexGrid>
  </div>
)
