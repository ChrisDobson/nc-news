import { useState, useEffect } from 'react';
import ArticleCards from './ArticleCards';
import { getArticles } from '../api';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const currUser = "tickle122";
    
    useEffect(() => {
        getArticles()
        .then((articlesFromApi) => {
            setArticles(articlesFromApi);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setError("Failed to fetch articles.");
            setIsLoading(false);
        });
    }, []);
    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className='home'>
            <p className='userMessage'>You are logged in as <strong>{currUser}</strong>. Welcome!</p>
            <h2 className='heading'>All Articles</h2>
            <div className='key'>
                <h3>Topics:</h3>
                <ul>
                    <li><span className='key-item coding'> Coding</span></li>
                    <li><span className='key-item cooking'> Cooking</span></li>
                    <li><span className='key-item football'> Football</span></li>
                </ul>
            </div>
        <ArticleCards articles={articles}/>
        </div>
    );
}