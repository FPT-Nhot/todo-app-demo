import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const loadTodos = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;

    await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    setTitle('');
    loadTodos();
  };

  const toggleTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'PUT',
    });

    loadTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE',
    });

    loadTodos();
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Todo App Demo</h1>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a todo"
          style={{ flex: 1, padding: 10 }}
        />

        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 10,
              border: '1px solid #ddd',
              marginBottom: 10,
            }}
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: 'pointer',
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;