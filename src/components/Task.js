import React from 'react';

class Task extends React.Component{	// example class base Component	
	render(){
		const {id, text, day, reminder} = this.props.task;
		const onChange = this.props.onChange;

		return(
			<section className={`task ${reminder ? 'reminder' : ''}`} key={id}> 
			  <h3>{text}</h3>
			  <p>{day}</p>
			  <div className='set-reminder'>
				  <p>Set Reminder</p>

				  <input 
				  	type='checkbox' 
				  	name='reminder' 
				  	checked={reminder}
				  	onChange={() => onChange(id)}
				  />
			  </div>
			</section>
		);
	}
}

export default Task;