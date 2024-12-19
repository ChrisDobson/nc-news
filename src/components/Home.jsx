import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ArticleCards from './ArticleCards';
import { getArticles } from '../api';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const currUser = 'guest';

    const [searchParams, setSearchParams] = useSearchParams();
    const topic = searchParams.get('topic');
    const sortBy = searchParams.get('sort_by') || 'created_at';
    const order = searchParams.get('order') || 'desc';
    
    useEffect(() => {
        getArticles(topic || undefined, { sort_by: sortBy, order })
        .then((articlesFromApi) => {
            setArticles(articlesFromApi);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setError("Failed to fetch articles.");
            setIsLoading(false);
        });
    }, [topic, sortBy, order]);

    const handleSortChange = (e) => {
        const sortType = e.target.value;
        const params = { sort_by: sortType, order };
        if (topic) params.topic = topic;
        setSearchParams(params);
    };

    const handleOrderChange = () => {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        const params = { sort_by: sortBy, order: newOrder };
        if (topic) params.topic = topic;
        setSearchParams(params);
    };

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <div className='home'>
            <p className='userMessage'>You are logged in as <strong>{currUser}</strong>. Welcome!</p>
            <Link to='/' className='return-to-home'>
            <h2 className='heading'>All Articles</h2>
            </Link>
            <div className='key'>
                <h3>Topics:</h3>
                <ul>
                    <li><Link to="?topic=coding" className="key-item coding">Coding</Link></li>
                    <li><Link to="?topic=cooking" className="key-item cooking">Cooking</Link></li>
                    <li><Link to="?topic=football" className="key-item football">Football</Link></li>
                </ul>
            </div>
            <div className='sorting-controls'>
                <select onChange={handleSortChange} value={sortBy}>
                    <option value='created_at'>Sort by date</option>
                    <option value='comment_count'>Sort by number of comments</option>
                    <option value='votes'>Sort by number of votes</option>
                </select>
                <button onClick={handleOrderChange}>Change Order (Current: {order === 'asc' ? 'Ascending' : 'Descending'})</button>
            </div>
        <ArticleCards articles={articles}/>
        </div>
    );
}