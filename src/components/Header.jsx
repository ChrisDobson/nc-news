import { Link } from 'react-router-dom';

export default function Header({ toggleTheme, currUser }) {
    return (
        <header>
            <Link to='/' className='return-to-home'>
                <h1>Northcoders News</h1>
            </Link>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </header>
    );
}