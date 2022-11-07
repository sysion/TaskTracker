import PropTypes from 'prop-types';

const Button = ({ color, text, onClick })=>{ 	// destructing props
	return(
		<button 
			className='btn' 
			style={{backgroundColor: color}} 
			onClick={onClick}
		>
			{text}
		</button>
	);
}

Button.defaultProps = {
	color: '#989898',
	text: 'Add',
}

Button.propTypes = {
	text: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func.isRequired,
}

export default Button;
