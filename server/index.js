const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let todos = [
    {
        id: 1,
        title: 'Learn React',
        description: 'Learn React',
        completed: false,
    },
    {
    id: 2,
    title: 'Build Node API',
    completed: true,
    },
];

app.get('/todos', (req, res) => {
    res.json(todos);
});
  
app.post('/todos', (req, res) => {
    const newTodo = {
      id: Date.now(),
      title: req.body.title,
      completed: false,
    };
  
    todos.push(newTodo);
    res.status(201).json(newTodo);
});
  
app.put('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
  
    todos = todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  
    const updated = todos.find(todo => todo.id === id);
    res.json(updated);
});
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ success: true });
});
  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});