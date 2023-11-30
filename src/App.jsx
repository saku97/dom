import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  useEffect(() => {
    // Load todos from localStorage on component mount
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditedTodo(todos[index]);
  };

  const saveEdit = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editedTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditedTodo("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditedTodo("");
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditedTodo("");
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {todo}
                <button onClick={() => startEdit(index)}>Edit</button>
                <button onClick={() => removeTodo(index)}>Remove</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
