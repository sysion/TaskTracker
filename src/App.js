import { useState } from 'react';
import Header from './components/Header';
import AppContent from './components/AppContent';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [tasklist, setTask] = useState([
    {
      id: 1,
      text: 'Visit Tunji Ososanya',
      day: '18th October, 2022 at 10:00am',
      reminder: false,
    },
    {
      id: 2,
      text: 'Tunji Ososanya mum\'s birthday',
      day: '24th October, 2022 at 4:10pm',
      reminder: true,
    },
    {
      id: 3,
      text: 'Tunji Ososanya\'s birthday',
      day: '29th October, 2022 at 12:30pm',
      reminder: true,
    },
    {
      id: 4,
      text: 'Follow up on Tunji Ososanya',
      day: '3rd November, 2022 at 9:00am',
      reminder: false,
    },
    {
      id: 5,
      text: 'Say hello to Tunji Ososanya\'s mum',
      day: '11th November, 2022 at 3:15pm',
      reminder: true,
    }
  ]);

  const clickHandler = (event)=>{
    //console.log('Hurray from App.js');

    event.preventDefault();

    const form = document.querySelector('.task-form');
    if (form.classList.contains('hidden')){
      form.classList.remove('hidden');
    }
    else{
      form.classList.add('hidden');
    }
  }

  const toggleReminder = (event) => {
    event.preventDefault();

    console.log('be reminded');
  }

  const saveTask = (event) => {
    event.preventDefault();
    
    console.log('saving new task');
  }

  return (
    <div className="App">
      <Header />
      <AppContent onClick={clickHandler} />
      <TaskList tasks={tasklist} onSubmit={saveTask} onChange={toggleReminder} />
      <Footer />
    </div>
  );
}

export default App;
