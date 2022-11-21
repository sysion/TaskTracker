import PropTypes from 'prop-types';

const Button = ({ color, text, onClick, onToggleButtonColor })=>{ 	// destructing props
	return(
		<button 
			className='btn' 
			style={!onToggleButtonColor ? {backgroundColor: color} : {backgroundColor: '#fe6868'}} 
			onClick={onClick}
		>
			{text}
		</button>
	);
}

Button.defaultProps = {
	color: '#989898',
	text: 'Add',
	onToggleButtonColor: '#fe6868',
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	onToggleButtonColor: PropTypes.bool.isRequired,
}

export default Button;
