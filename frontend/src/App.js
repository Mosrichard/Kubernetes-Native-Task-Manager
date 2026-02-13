import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/tasks`, { title: input });
      setTasks([res.data, ...tasks]);
      setInput('');
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Toggle completed state
  const toggleTask = async (id, completed) => {
    try {
      const res = await axios.put(`${API_URL}/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>✨ Task Manager</h1>
          <div className="stats">
            <span>Total: {tasks.length}</span>
            <span>•</span>
            <span>Completed: {completedCount}</span>
          </div>
        </div>

        <div className="input-container">
          <input
            className="task-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
          />
          <button className="add-btn" onClick={addTask}>Add</button>
        </div>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {tasks.map(task => (
              <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id, task.completed)}
                />
                <span className="task-text">{task.title}</span>
                <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
