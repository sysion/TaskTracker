import PropTypes from 'prop-types';
import Button from './Button';


const AppContent = ({ title, onToggleTaskForm, toggleButtonText }) => { 	// destructing props
	/*const clickHandler = (event)=>{
		console.log('Hurray');
	}*/

	return (
		<div className='app-header'> 
			<h1>{title}</h1>

			<Button 
				color='#6868fe' 
				onClick={onToggleTaskForm} 
				text={toggleButtonText ? 'Close' : 'Add'} 
			/>
		</div>
	);

}

AppContent.defaultProps = {
	title: 'Task Tracker',
}

AppContent.propTypes = {
	title: PropTypes.string.isRequired,
	onToggleTaskForm: PropTypes.func.isRequired,
	toggleButtonText: PropTypes.bool.isRequired,
}

export default AppContent;