import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completedTasks: true,
  });
  console.log(tasks);

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with Priority</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm addTask={addTask} />}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button className="sort-button">By Date</button>
          <button className="sort-button">By Priority</button>
        </div>
        {openSection.tasks && (
          <TaskList
            completeTask={completeTask}
            deleteTask={deleteTask}
            activeTasks={activeTasks}
          />
        )}
      </div>

      <div className="completed-task-container">
        <h2>Completed Task</h2>
        <button
          className={`close-button ${openSection.completedTasks ? "open" : ""}`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
        {openSection.completedTasks && (
          <CompletedTaskList
            deleteTask={deleteTask}
            completedTasks={completedTasks}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("low");
      setDeadline("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => {
          console.log(e);
          setTitle(e.target.value);
        }}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="datetime-local"
        value={deadline}
        required
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          completeTask={completeTask}
          deleteTask={deleteTask}
          key={task.id}
          task={task}
        />
      ))}
    </ul>
  );
}

function CompletedTaskList({ completedTasks, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((item) => (
        <TaskItem key={item.id} task={item} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id, completed } = task;
  console.log(task);

  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        components composition, conditional rendering, array methods (map,
        filter), event handling.
      </p>
    </footer>
  );
}
//Fokeev 6 vid 6.7
