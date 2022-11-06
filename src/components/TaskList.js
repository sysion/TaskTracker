import PropTypes from 'prop-types';
import Task from './Task';

const TaskList = (props) => {
	const {tasks, onChange, onSubmit} = props;

	return (
		<div className='tasklist-wrapper'>
			<div className='tasklist'> 
				{
					tasks.map((task) => <Task key={task.id} task={task} onChange={onChange} />)
				}
			</div>

			<form className='task-form' onSubmit={onSubmit}> 
				<form-group> 
					<input type='text' name='task-text' placeholder='Enter task' />
				</form-group>

				<form-group> 
					<input type='text' name='task-date' placeholder='Enter date' />
				</form-group>

				<form-group> 
					<input type='text' name='task-reminder' placeholder='Set Reminder: True or False' />
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
}

TaskList.propTypes = {
	tasks: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
}

export default TaskList;