import { useState, useEffect } from 'react';
import Header from './components/Header';
import AppContent from './components/AppContent';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const appKey = 'h8t#hf7ks2nf*';       // for localStorage

  const saveTasklistToStorage = (name, tasklist) => {
    localStorage.setItem(name, JSON.stringify(tasklist));
  }

  const getTasklistFromStorage = (name) => {
    return JSON.parse(localStorage.getItem(name)) || [];
  }

  const [tasklist, setTasks] = useState(getTasklistFromStorage(appKey));    // load tasklist from localStorage when starting
  useEffect(() => {saveTasklistToStorage(appKey, tasklist)}, [tasklist]);   // when tasklist changes, save tasklist to localStorage 

  // toggle task form - reactjs solution
  const [toggleTaskForm, setToggleTaskForm] = useState(false);  // toggleTaskForm is boolean

  let taskFormToggle = ()=>{  // convert toggleTaskForm into a function required by AppContent component
    setToggleTaskForm(!toggleTaskForm);
  }

  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasklist.map(task => task.id === id ? {...task, reminder: !task.reminder} : task));
  }

  const validateDate = (date) => {
    var valid = false;

    var splitTag = date.includes('@') ? '@' : 'at'
    var taskDate = date.trim().split(splitTag);

    if (taskDate.length === 2){
      var checkDate = new Date(taskDate[0]);
    }
    
    return valid;
  }

  const doubleClickHandler = (id, editable) => {        
    return editable = !editable;
  }

  // save new task
  const saveTask = (task) => {
    if (task.reminder === '' || task.reminder === undefined){
      task.reminder = false;
    }

    const id = Math.floor(Math.random()*(10000 - 1)) + 1;   // random number between 1 and 10,000 inclusive
    const newTask = {id, ...task};
    setTasks([...tasklist, newTask]);
  }

  // update changed task
  const updateTask = (delEditTask) => { 
    setTasks(tasklist.filter(task => task.id === delEditTask.id ? delEditTask : task));
  }

  // delete task
  const deleteTask = (delEditTask) => {    
    setTasks(tasklist.filter((task) => task.id !== delEditTask.id));
  }

  // handleDeleteEdit() prop
  const editDeleteHandler = (target, delEditTask)=>{
    if (target === 'delete-icon'){
      deleteTask(delEditTask);
    }
    else if (target === 'edit-icon'){
      updateTask(delEditTask);
    }
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <AppContent onToggleTaskForm={taskFormToggle} toggleButtonText={toggleTaskForm} />
        <Routes>
          <Route exact path='/' element={
            <TaskList 
              tasks={tasklist} 
              onSaveTask={saveTask} 
              onToggleReminder={toggleReminder} 
              toggleTaskForm={toggleTaskForm} 
              handleDeleteEdit={editDeleteHandler}
              enableEdit={doubleClickHandler}
            />
          } 
          /> 

          <Route exact path='/about' element={<About />} /> 
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
