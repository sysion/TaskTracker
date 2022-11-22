import React from 'react';
import delete_icon from '../images/trash-1.svg';
import edit_icon from '../images/edit-2.svg';


class Task extends React.Component{	// example class base Component	
	constructor(props){
		super(props);
		this.state = {
			editable: false,
			text: '',
			day: ''
		}; 
	}

	render(){
		const {id, text, day, reminder} = this.props.task;
		const onChange = this.props.onChange;
		const handleDeleteEdit = this.props.onClick;
		const onDoubleClick = this.props.onDoubleClick;

		const handleOnBlur = this.props.onBlur;

		const deleteUpdateHandler = (event)=>{
			var target;

			if (event.target.id === 'delete-icon'){
				target = 'delete-icon';
			}
			else if (event.target.id === 'edit-icon'){
				target = 'edit-icon';

				if (this.state.editable){
					this.setState({editable: false});
				}
				else{
					return;
				}
			}

			handleDeleteEdit(target, id);
		}
		
		const toggleEditable = (event)=>{
			if (this.state.editable == true) return;	// disabled onDoubleClicked() event if editable is true
			this.setState({editable: onDoubleClick(id, this.state.editable)});
		}

		const editOnDoubleClick = (event)=>{
			event.stopPropagation();
		}

		const handleOnFocus = (event)=>{	// help to automatically save state of {text and day}
			if (this.state.editable === true){
				handleOnBlur(id, this.state.text, 'task-text-edit');
				handleOnBlur(id, this.state.day, 'task-date-edit');
			}
			else{
				return;
			}
			
		}

		const handleTextFocus = (event)=>{	
			this.setState({text: event.target.value});	// save old value in text field to state
		}

		const handleDayFocus = (event)=>{
			this.setState({day: event.target.value});	// save old value in day field to state
		}

		return(
			<section 
				className={`task ${reminder ? 'reminder' : ''}`} 
				key={id} 
				onDoubleClick={(event)=>toggleEditable(event)}
				tabIndex={0}    // alows this element to be focusable
				onFocus={handleOnFocus}	// help to automatically save state of {text and day}
				autoFocus
			> 
				{this.state.editable ?
				  <>
					  <input 
							type='text' 
							name='task-text-edit'  
							defaultValue={text}
							onChange={event => this.setState({text: event.target.value})}
							onFocus={handleTextFocus.bind(this)}
							autoFocus
						/>
						<input 
							type='text' 
							name='task-date-edit' 
							defaultValue={day}
							onChange={event => this.setState({day: event.target.value})}
							onFocus={handleDayFocus.bind(this)}
							autoFocus
						/>
					</>
					:
					<>
					  <h3>{text}</h3>
					  <p>{day}</p>
				  </>
				}
			  <div className='set-reminder'>
				  <p>Set Reminder</p>

				  <input 
				  	type='checkbox' 
				  	name='reminder' 
				  	checked={reminder}
				  	onChange={() => onChange(id)}
				  />
			  </div>
			  <div className='task-icon'> 
			  	<img id='delete-icon' src={delete_icon} alt='delete icon' onClick={deleteUpdateHandler} />
			  	<img id='edit-icon' src={edit_icon} alt='edit icon' onClick={deleteUpdateHandler} onDoubleClick={editOnDoubleClick} />
			  </div>
			</section>
		);
	}
}

export default Task;