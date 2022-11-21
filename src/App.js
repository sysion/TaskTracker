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

  /*const [tasklist, setTasks] = useState([
    {
      id: 1,
      text: 'Visit Tunji Osowhat',
      day: '18th October, 2022 at 10:00am',
      reminder: false,
    },
    {
      id: 2,
      text: 'Tunji Osowhat mum\'s birthday',
      day: '24th October, 2022 at 4:10pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Tunji Osowhat\'s birthday',
      day: '29th October, 2022 at 12:30pm',
      reminder: true,
    },
    {
      id: 4,
      text: 'Follow up on Tunji Osowhat',
      day: '3rd November, 2022 at 9:00am',
      reminder: false,
    },
    {
      id: 5,
      text: 'Say hello to Tunji Osowhat\'s mum',
      day: '11th November, 2022 at 3:15pm',
      reminder: true,
    }
  ]);*/

  const [tasklist, setTasks] = useState(getTasklistFromStorage(appKey));    // load tasklist from localStorage when starting
  useEffect(() => {saveTasklistToStorage(appKey, tasklist)}, [tasklist]);   // when tasklist changes, save tasklist to localStorage 

  /*/ toggle task form - javascript solution (working okay)
  const toggleTaskForm = (event)=>{
    event.preventDefault();
    const form = document.querySelector('.task-form');

    if (form.classList.contains('hidden')){
      form.classList.remove('hidden');
    }
    else{
      form.classList.add('hidden');
    }
  }*/

  // toggle task form - reactjs solution
  const [toggleTaskForm, setToggleTaskForm] = useState(false);  // toggleTaskForm is boolean

  let taskFormToggle = ()=>{  // convert toggleTaskForm into a function required by AppContent component
    setToggleTaskForm(!toggleTaskForm);
    //const showHide = toggleTaskForm;
    //console.log('showHide =',showHide);
    //return toggleTaskForm;
  }

  // toggle reminder
  const toggleReminder = (id) => {
    //event.preventDefault();
    //console.log('be reminded');
    //tasklist.map(task => task.id === id ? console.log('checkbox id =', id) : '');

    // pure javascript solution not working properly and NOT required in pure React solution
    //const task_section = document.querySelector('.task');
    //const task_reminder = document.querySelector('.task input[type=\'checkbox\']');
    //task_reminder.checked ? task_section.classList.add('reminder') : task_section.classList.remove('reminder');

    setTasks(tasklist.map(task => task.id === id ? {...task, reminder: !task.reminder} : task));
    //window.localStorage.setItem(appKey, JSON.stringify(tasklist));  // not working

    /*/ not working
    tasklist.map((task) => {
      if (task.id === id && task.reminder === false){
        task_section.classList.add('reminder');
        console.log('checkbox id =', id);
      }
      else if (task.id === id && task.reminder === true){
        task_section.classList.remove('reminder');
        console.log('checkbox id =', id);
      }
    })*/

  }

  const validateDate = (date) => {
    var valid = false;

    var splitTag = date.includes('@') ? '@' : 'at'
    var taskDate = date.trim().split(splitTag);

    console.log(taskDate);

    if (taskDate.length === 2){
      console.log(taskDate[0].trim());
      var checkDate = new Date(taskDate[0]);
      console.log(checkDate);
    }
    
    return valid;
  }

  const doubleClickHandler = (id, editable) => {    
    //console.log('App before: id = %s, editable = %s', id, editable);
    //if (editable == true) return; // not disabling the doubleClick() as expected, moved into Task component
    //editable = !editable;
    //console.log('App after: id = %s, editable = %s', id, editable);
    //return editable;
    
    return editable = !editable;
  }

  // save new task
  const saveTask = (task) => {
    //event.preventDefault();
    //console.log('saving new task');
    //console.log(task);
    
    //if (!validateDate(task.day)) return;

    //console.log(new Date().getMonth());
    // input validation
    /*if (task.text === '' || task.day === '' && (task.reminder != false || task.reminder != true)){
      alert('wrong input');
      return;
    }*/
    //console.log(task.text);
    //console.log(task.day);
    //console.log(task.reminder);

    if (task.reminder === '' || task.reminder === undefined){
      task.reminder = false;
    }

    const id = Math.floor(Math.random()*(10000 - 1)) + 1;   // random number between 1 and 10,000 inclusive
    const newTask = {id, ...task};
    //console.log(newTask);
    setTasks([...tasklist, newTask]);
    //window.localStorage.setItem(appKey, JSON.stringify(tasklist));  // not working
  }

  /*/ update changed task
  const updateTask = (id) => { 
    const updTask = tasklist.filter(task => task.id === id);
    console.log(updTask);
  }

  // delete task
  const deleteTask = (id) => {    
    //console.log('deleting task', id);
    setTasks(tasklist.filter((task) => task.id !== id));
    //window.localStorage.setItem(appKey, JSON.stringify(tasklist));  // not working
  }

  // handleDeleteEdit() prop
  const editDeleteHandler = (target, id)=>{
  //const editDeleteHandler = (target, delUpdTask)=>{
    if (target === 'delete-icon'){
      deleteTask(id);
    }
    else if (target === 'edit-icon'){
      updateTask(id);
    }
  }*/

  // update changed task
  const updateTask = (delEditTask) => { 
    console.log('updateTask => ', delEditTask);
    const updTask = tasklist.filter(task => task.id === delEditTask.id);
    console.log('updTask => ',updTask);
    //setTasks(tasklist.map(task => task.id === delEditTask.id ? delEditTask : task));  // nok

    setTasks(tasklist.filter(task => task.id === delEditTask.id ? delEditTask : task));   //ok
  }

  // delete task
  const deleteTask = (delEditTask) => {    
    //console.log('deleteTask delEditTask => ', delEditTask);
    setTasks(tasklist.filter((task) => task.id !== delEditTask.id));
  }

  // handleDeleteEdit() prop
  const editDeleteHandler = (target, delEditTask)=>{
    if (target === 'delete-icon'){
      //console.log('editDeleteHandler deleting => ', delEditTask);
      deleteTask(delEditTask);
    }
    else if (target === 'edit-icon'){
      console.log('editDeleteHandler editing => ', delEditTask);
      updateTask(delEditTask);
    }
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <AppContent onToggleTaskForm={taskFormToggle} toggleButtonText={toggleTaskForm} />
        {/*<TaskList 
          tasks={tasklist} 
          onSaveTask={saveTask} 
          onToggleReminder={toggleReminder} 
          toggleTaskForm={toggleTaskForm} 
        />*/}

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
