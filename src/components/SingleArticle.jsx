import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`https://my-nc-news-2zd4.onrender.com/api/articles/${article_id}`)
        .then((response) => {
            setArticle(response.data.article);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to fetch the article.');
            setIsLoading(false);
        });
    }, [article_id]);

if (isLoading) return <p>Loading...</p>;
if (error) return <p>{error}</p>;

return (
    <>
    <h2>{article.title}</h2>
    <p>By: {article.author}</p>
    <p>{article.body}</p>
    </>
    );
}