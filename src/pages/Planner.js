import React, { useState, useEffect } from "react";
import "./Planner.css";

const getToday = () => new Date().toISOString().split("T")[0]; // YYYY-MM-DD

const Planner = () => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [habitInput, setHabitInput] = useState("");
  const [today, setToday] = useState(getToday());

  useEffect(() => {
    const storedTasks = localStorage.getItem(`planner_tasks_${today}`);
    const storedHabits = localStorage.getItem("planner_habits");

    if (storedTasks) setTasks(JSON.parse(storedTasks));
    if (storedHabits) setHabits(JSON.parse(storedHabits));
  }, [today]);

  useEffect(() => {
    localStorage.setItem(`planner_tasks_${today}`, JSON.stringify(tasks));
  }, [tasks, today]);

  useEffect(() => {
    localStorage.setItem("planner_habits", JSON.stringify(habits));
  }, [habits]);

  const addTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { text: taskInput, done: false }]);
    setTaskInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const addHabit = () => {
    if (!habitInput.trim()) return;
    setHabits([...habits, { name: habitInput, streak: 0, lastCompleted: null }]);
    setHabitInput("");
  };

  const toggleHabit = (index) => {
    const updated = [...habits];
    const today = getToday();

    if (updated[index].lastCompleted === today) {
      updated[index].lastCompleted = null;
      updated[index].streak = Math.max(0, updated[index].streak - 1);
    } else {
      updated[index].lastCompleted = today;
      updated[index].streak += 1;
    }

    setHabits(updated);
  };

  return (
    <div className="planner-container">
      <h1>🗓️ Daily Planner</h1>

      <section className="planner-section">
        <h2>✅ Today's Tasks</h2>
        <div className="input-row">
          <input
            type="text"
            value={taskInput}
            placeholder="Add new task"
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <ul className="planner-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`planner-item ${task.done ? "checked" : ""}`}
              onClick={() => toggleTask(index)}
            >
              {task.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="planner-section">
        <h2>🏋️ Habit Tracker</h2>
        <div className="input-row">
          <input
            type="text"
            value={habitInput}
            placeholder="Add new habit"
            onChange={(e) => setHabitInput(e.target.value)}
          />
          <button onClick={addHabit}>Add Habit</button>
        </div>
        <ul className="planner-list">
          {habits.map((habit, index) => (
            <li
              key={index}
              className={`planner-item ${
                habit.lastCompleted === today ? "checked" : ""
              }`}
              onClick={() => toggleHabit(index)}
            >
              {habit.name} — 🔥 Streak: {habit.streak}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Planner;
