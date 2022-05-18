import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import "./components/style.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks()
  }, []);

  // Fetch Data
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Data
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Toggle Reminder

  //  without JSON

  const toggleReminder = (id) => {
    // console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  // with JSON

  const toggleReminderJSON = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT", // update
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  };

  // Add Tasks

  // without Json
  const addTask = (task) => {
    let id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // with JSON

  const addTaskJSON = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  //////////////////////////////////

  // Delete Tasks from JSON

  // without JSON

  // Delete Task
  const deleteTask = (id) => {
    // console.log("delete",id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // with JSON

  const deleteTaskJSON = async (id) => {
    const res = await  fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    res.status === 200 
    ? setTasks(tasks.filter((task)=>task.id !== id))
    : alert('Error Deleting this Task')
  }

  ///////////////////////////////////////////////

  return (
    <Router>
      <div className="cont">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />
        <Routes>
          <Route
            path="/tasks-add-react"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTaskJSON} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    // onDelete={deleteTask}
                    onDelete={deleteTaskJSON}
                    onToggle={toggleReminderJSON} 

                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About/>}/>
        </Routes>            
        <Footer />
      </div>
    </Router>
  );
}

export default App;
