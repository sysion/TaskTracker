import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='header'> 
			<nav> 
				<ul> 
					{/* changed a tag to Link to prevent normal reload tendency when a tags are clicked */}
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
				</ul>
			</nav>
		</header>
	);

}

export default Header;