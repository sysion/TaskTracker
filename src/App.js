import { useState } from 'react';
import Header from './components/Header';
import AppContent from './components/AppContent';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';
import About from './components/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [tasklist, setTasks] = useState([
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
  ]);

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

  // save new task
  const saveTask = (task) => {
    //event.preventDefault();
    //console.log('saving new task');
    //console.log(task);

    // input validation
    /*if (task.text === '' || task.day === '' && (task.reminder != false || task.reminder != true)){
      alert('wrong input');
      return;
    }*/
    //console.log(task.text);
    //console.log(task.day);
    //console.log(task.reminder);

    const id = Math.floor(Math.random()*(10000 - 1)) + 1;   // random number between 1 and 10,000 inclusive
    const newTask = {id, ...task};
    //console.log(newTask);
    setTasks([...tasklist, newTask]);
  }

  // update changed task
  const updateTask = (id) => {    
    console.log('updating task', id);
  }

  // delete task
  const deleteTask = (id) => {    
    //console.log('deleting task', id);
    setTasks(tasklist.filter((task) => task.id !== id))
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
