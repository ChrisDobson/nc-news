import { Link } from 'react-router-dom';

export default function Header({ toggleTheme }) {
    return (
        <>
        <Link to='/' className='return-to-home'>
        <h1>Northcoders News</h1>
        </Link>
        <button onClick={toggleTheme} className='theme-toggle-button'>Toggle Theme</button>
        </>
    );
}