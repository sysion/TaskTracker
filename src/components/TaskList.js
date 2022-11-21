import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = (props) => {
	const {tasks, onToggleReminder, onSaveTask, toggleTaskForm, handleDeleteEdit, enableEdit} = props;
	
	{/* text, day and reminder are undefined here, hence this will lead to 
	    "Warning: A component is changing an uncontrolled input to be controlled.",
			when there values are changed. First solution is to provide initial
			value for each variable e.g. {day || ''} at the point of setting the
			value. Second solution is to provide initial value when useState is
			called e.g. const [reminder, setReminder] = useState(''); */}
	const [text, setText] = useState();
	const [day, setDay] = useState();
	const [reminder, setReminder] = useState(''); // prevents Warning: A component is changing an uncontrolled input to be controlled.
	//const [reminder, setReminder] = useState();		// NOK for reminder

	/*if (toggleTaskForm){
		setText('');
		setDay('');
	}*/

	const clearReminder = () => {
		var reminderText = document.querySelector("input[name='task-reminder']");
		reminderText.value = '';
	}

	// use onSaveTask to create onSubmit
	const onSubmit = (event) => {
    event.preventDefault();

    // input validation
    //if (text === '' || text === undefined || day === '' || day === undefined || reminder === '' || reminder === undefined){
    if (text === '' || text === undefined || day === '' || day === undefined){
			// reset form input fields
			setText('');
			setDay('');
			setReminder('');
			clearReminder();		// javascript hack, couldn't get this to work in React way
    	return;
    }

    onSaveTask({text, day, reminder});	// equivalent to onSaveTask(task) before destructuring

    // reset form input fields
    setText('');
    setDay('');
    setReminder('');
    clearReminder();		// javascript hack, couldn't get this to work in React way
  }

  const taskOnChangeHandler = (id, name)=>{
  	if (name === 'reminder'){
  		onToggleReminder();
  	}
  }

  /*const updateTaskEditHandler = (target, id)=>{		// commit changes to localStorage and/or database
  	handleDeleteEdit(target, id);
  }

  const taskEditHandler = (id, value, name) => { // update text and day following edit
  	console.log('TaskList id = %s, value = %s, name = %s',id, value, name);
  	let editTask = tasks.filter(task => task.id === id);
  	console.log('editTask before => ', editTask);
  	if (name === 'task-text-edit'){
  		//setText(value);
  		editTask.text = value;
  		setText(editTask.text);
  	}
  	else if (name === 'task-date-edit'){
  		//setDay(value);
  		editTask.day = value;
  		setDay(editTask.day);
  	}
  	setText('');
    setDay('');

    tasks.map(task => task.id === editTask.id ? editTask : task);
    //editTask = tasks.filter(task => task.id === id);
  	//console.log('editTask after => ', editTask);
  }*/

  const updateTaskEditHandler = (target, id)=>{		// commit changes to localStorage and/or database
  	let editTask = tasks.filter(task => task.id === id);		// returns an array
  	//console.log('Task delete/edit before => ', editTask);
  	editTask[0].text = text;
  	editTask[0].day = day;
  	handleDeleteEdit(target, editTask[0]);	// return first and only element of the array
  	setText('');
    setDay('');
  }

  const taskEditHandler = (id, value, name) => { // update text and day following edit
  	 //console.log('TaskList id = %s, value = %s, name = %s',id, value, name);

  	if (name === 'task-text-edit'){
  		setText(value);
  	}
  	else if (name === 'task-date-edit'){
  		setDay(value);
  	}
  }

	return (
		<div className='tasklist-wrapper'>
			<form className={`task-form ${toggleTaskForm ? '' : 'hidden'}`} onSubmit={onSubmit}> 
				<form-group> 
					<input 
						type='text' 
						name='task-text' 
						placeholder='Enter task' 
						value={text || ''}   // prevents Warning: A component is changing an uncontrolled input to be controlled.
						onChange={(e) => setText(e.target.value)}
					/>
				</form-group>

				<form-group> 
					<input 
						type='text' 
						name='task-date' 
						placeholder='Date and time: 2nd November, 2022 at 10:18am'
						value={day || ''} 	// prevents Warning: A component is changing an uncontrolled input to be controlled.
						onChange={(e) => setDay(e.target.value)}
					/>
				</form-group>

				<form-group> 
					<input 
						type='text' 
						name='task-reminder'
						placeholder='Set Reminder: true or false'
						defaultValue={reminder} 	// to allow edit when using hook, defaultValue should be used instead of value
						onChange={(e) => setReminder(e.target.value.toLowerCase() === 'true')}
					/>
				</form-group>

				<form-group> 
					<button className='btn' type='submit' name='save-task'>Save Task</button>
				</form-group>
			</form>

			<div className='tasklist'> 
				{
					tasks.map((task) => <Task 
											key={task.id} 
											task={task} 
											onChange={onToggleReminder} 
											onClick={updateTaskEditHandler}
											onDoubleClick={enableEdit}

											onBlur={taskEditHandler}
									 />)
				}
			</div>

		</div>
	);

}

TaskList.defaultProps = {
  tasks: [],
  toggleTaskForm: false,
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onToggleReminder: PropTypes.func.isRequired,
  onSaveTask: PropTypes.func.isRequired,
  toggleTaskForm: PropTypes.bool.isRequired,
}

export default TaskList;