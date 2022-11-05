import PropTypes from 'prop-types';
import Button from './Button';


const AppContent = ({ title }) => { 	// destructing props
	const clickHandler = (event)=>{
		console.log('Hurray');
	}

	return (
		<div className='app-header'> 
			<h1>{title}</h1>

			<Button color='#6868fe' onClick={clickHandler} />
		</div>
	);

}

AppContent.defaultProps = {
	title: 'Task Tracker',
}

AppContent.propTypes = {
	title: PropTypes.string.isRequired,
}

export default AppContent;