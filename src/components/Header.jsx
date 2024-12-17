import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <>
        <Link to='/' className='return-to-home'>
        <h1>Northcoders News</h1>
        </Link>
        </>
    )
}