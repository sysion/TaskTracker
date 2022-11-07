import { useState } from 'react';
import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = (props) => {
	const {tasks, onToggleReminder, onSaveTask, toggleTaskForm} = props;
	
	const [text, setText] = useState();
	const [day, setDay] = useState();
	const [reminder, setReminder] = useState(false);

	// use onSaveTask to create onSubmit
	const onSubmit = (event) => {
    event.preventDefault();

    onSaveTask({text, day, reminder});	// equivalent to onSaveTask(task) before destructuring

    // reset form input fields
    setText('');
    setDay('');
    setReminder(false);
  }

	return (
		<div className='tasklist-wrapper'>
			<div className='tasklist'> 
				{
					tasks.map((task) => <Task key={task.id} task={task} onChange={onToggleReminder} />)
				}
			</div>

			<form className={`task-form ${toggleTaskForm ? '' : 'hidden'}`} onSubmit={onSubmit}> 
				<form-group> 
					<input 
						type='text' 
						name='task-text' 
						placeholder='Enter task' 
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
				</form-group>

				<form-group> 
					<input 
						type='text' 
						name='task-date' 
						placeholder='Enter date'
						value={day}
						onChange={(e) => setDay(e.target.value)}
					/>
				</form-group>

				<form-group> 
					<input 
						type='text' 
						name='task-reminder'
						placeholder='Set Reminder: True or False'
						value={reminder}
						checked={reminder}
						onChange={(e) => setReminder(e.target.value)}
					/>
				</form-group>

				<form-group> 
					<button className='btn' type='submit' name='save-task'>Save Task</button>
				</form-group>
			</form>
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