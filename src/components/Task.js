import React, { createRef } from 'react';
import delete_icon from '../images/trash-1.svg';
import edit_icon from '../images/edit-2.svg';


class Task extends React.Component{	// example class base Component	
	constructor(props){
		super(props);
		//this.editable = false;
		//const [editable, setEditable] = useState(false);		// React Hook can not be used in class component
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
		//const resetEditable = this.props.resetEditable;

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
			/* this is not working because component is not re-rendered
			   despite changes to editable */
			//console.log('toggleEditable before: ', this.editable);
			//this.editable = onDoubleClick(id, this.editable);
			//console.log('toggleEditable after: ', this.editable);

			if (this.state.editable == true) return;	// disabled onDoubleClicked() event if editable is true

			/* this now works because setState() automatically re-renders
			   component but this is not the case when previous method
			   was used */
			//console.log('toggleEditable before: ', this.state.editable);
			this.setState({editable: onDoubleClick(id, this.state.editable)});
			//console.log('toggleEditable after: ', this.state.editable);

			//this.oldText = text;
			//this.oldDay = day;
			//console.log('_oldText => %s, oldDay => %s',this.oldText,this.oldDay);
		}

		/*const editTaskHandler = (event, id)=>{
			/*let oldText = text;
			let oldDay = day;*
			let newText = '';
			let newDay = this.taskDateEdit.current.value;
		
			if (event.target.name === 'task-text-edit'){
				//newText = (event.target.value === '' || event.target.value === undefined) ? this.oldText : event.target.value;
				//handleOnBlur(id, newText, event.target.name);
				handleOnBlur(id, newText, event.target.name);
			}
			else if (event.target.name === 'task-date-edit'){
				//newDay = (event.target.value === '' || event.target.value === undefined) ? this.oldDay : event.target.value;
				//handleOnBlur(id, newDay, event.target.name);
				handleOnBlur(id, newDay, event.target.name);
			}

			console.log('newText => %s, newDay => %s',newText,newDay);
		}*/

		const editOnDoubleClick = (event)=>{
			/* 
				prevent DoubleClicking this icon from triggering parent DoubleClick() action
				i.e. onDoubleClick() event on the parent(<section>) is stopped from reaching 
				this child(<img>) element. 
			*/
			event.stopPropagation();

			//if (this.state.editable == false) return;
		}

		const handleOnFocus = (event)=>{	// help to automatically save state of {text and day}
			if (this.state.editable === true){
				//console.log('focus here !!!');
				//console.log('text => %s, day => %s',this.state.text, this.state.day);
				handleOnBlur(id, this.state.text, 'task-text-edit');
				handleOnBlur(id, this.state.day, 'task-date-edit');
			}
			else{
				return;
			}
			
		}

		const handleTextFocus = (event)=>{	
			//let oText = event.target.value;
			//console.log('oText => ', oText);
			console.log('etv_text => ', event.target.value);
			this.setState({text: event.target.value});	// save old value in text field to state
		}

		const handleDayFocus = (event)=>{
			//let oDay = event.target.value;
			//console.log('oDay => ', oDay);
			console.log('etv_day => ', event.target.value);
			this.setState({day: event.target.value});	// save old value in day field to state
		}

		return(
			<section 
				className={`task ${reminder ? 'reminder' : ''}`} 
				key={id} 
				onDoubleClick={(event)=>toggleEditable(event)}
				tabIndex={0}    // alows this element to be focusable
				//onClick={handleOnClick}
				onFocus={handleOnFocus}	// help to automatically save state of {text and day}
				autoFocus
			> 
				{this.state.editable ?
				  <>
					  <input 
							type='text' 
							name='task-text-edit'  
							//value={text || ''}	// for it to be editable, it MUST be defaultValue
							defaultValue={text}
							onChange={event => this.setState({text: event.target.value})}
							onFocus={handleTextFocus.bind(this)}
							autoFocus
							
							//onBlur={(event)=>editTaskHandler(event, id)}
							//ref={this.taskTextEdit}
						/>
						<input 
							type='text' 
							name='task-date-edit' 
							//value={day || ''}	// for it to be editable, it MUST be defaultValue
							defaultValue={day}
							onChange={event => this.setState({day: event.target.value})}
							onFocus={handleDayFocus.bind(this)}
							autoFocus

							//onBlur={(event)=>editTaskHandler(event,id)}
							//ref={this.taskDateEdit}
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