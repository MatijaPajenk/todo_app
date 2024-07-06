"use client"
import { useState, useEffect } from "react"
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  FlexGrid,
  Row,
} from "@carbon/react"
import { Add } from "@carbon/icons-react"
import { TodoItem, Filter } from "./types"
import { TodoList } from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [currentContent, setCurrentContent] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    if (todos.length === 0) return

    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = () => {
    if (currentContent.trim().length === 0) {
      return
    }

    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        content: currentContent,
        completed: false,
      },
    ])
    setCurrentContent("")
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  return (
    <main style={{ margin: "1.5em" }}>
      <FlexGrid>
        <h1>TODO List</h1>
        <br />
        <Row as="section">
          <TextInput
            id="todo_content"
            labelText=""
            type="text"
            placeholder="Enter new TODO"
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo()
              }
            }}
          />
          <Button
            kind="secondary"
            size="md"
            renderIcon={Add}
            iconDescription="Add new TODO"
            onClick={() => handleAddTodo()}>
            Add
          </Button>
        </Row>
        <br />
        <Row>
          <Select
            id="filter"
            labelText="Filter Todos:"
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}>
            <SelectItem value="all" text="All" />
            <SelectItem value="completed" text="Completed" />
            <SelectItem value="incomplete" text="Incomplete" />
          </Select>
        </Row>
        <br />
        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
          filter={filter}
        />
      </FlexGrid>
    </main>
  )
}

export default App
