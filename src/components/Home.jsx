import { useState, useEffect } from 'react';
import ArticleCards from './ArticleCards';
import { getArticles } from '../api';

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        getArticles()
        .then((articlesFromApi) => {
            const sortedArticles = articlesFromApi.sort((a, b) => a.article_id - b.article_id);
            setArticles(sortedArticles);
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
        <>
        <h2 className='heading'>All Articles</h2>
        <ArticleCards articles={articles}/>
        </>
    );
}