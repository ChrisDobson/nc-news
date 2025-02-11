import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='not-found'>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to='/' className='return-to-home'>Return to home</Link>
        </div>
    );
}