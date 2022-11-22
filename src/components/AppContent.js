import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from 'react-router-dom';

const AppContent = ({ title, onToggleTaskForm, toggleButtonText }) => { 	// destructing props
	const location = useLocation();

	return (
		<div className='app-header'> 
			<h1>{title}</h1>

			{location.pathname === '/' && (<Button 
				color='#6868fe' 
				onClick={onToggleTaskForm} 
				text={toggleButtonText ? 'Close' : 'Add'} 
				onToggleButtonColor={toggleButtonText}
			/>)}
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