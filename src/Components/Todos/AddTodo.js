// AddTodo.js
import React, { useState } from 'react';

const AddTodo = ({ addTask, taskListName }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [showForm, setShowForm] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    addTask(taskListName, title, desc, dueDate, priority);
    setTitle('');
    setDesc('');
    setDueDate('');
    setPriority('');
    setShowForm(false);
  };

  const color = {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'green',
    color: 'white',
    border: "2px solid red",
    borderRadius: "20px",
    width: "400px",
    textAlign: "center"
  };

  const priorityDivs = ["Low", "Medium", "High"];

  return (
    <div className='container my-3'>
      <h3>Please enter a Task List here</h3>
      {showForm && (
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Task Description</label>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" id="desc" required />
          </div>
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="form-control" id="dueDate" required />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-select" id="priority" required>
              <option value="">Select Priority</option>
              {priorityDivs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-sm btn-primary">Add Task</button>
          <br />
          <br />
          <div style={{ display: 'flex', gap: "10px" }}>
            {priorityDivs.map((p) => (
              <div key={p} style={color}>{p}</div>
            ))}
          </div>
        </form>
      )}
      {!showForm && (
        <button className="btn btn-primary mt-2" onClick={() => setShowForm(true)}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default AddTodo;