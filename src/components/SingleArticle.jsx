import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleById } from '../api';
import { format } from 'date-fns';

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticleById(article_id)
        .then((response) => {
            setArticle(response.article);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to fetch the article.');
            setIsLoading(false);
        });
    }, [article_id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyy');
    };

const getTopic = (topic) => {
    switch (topic) {
        case 'coding': return 'coding';
        case 'cooking': return 'cooking';
        case 'football': return 'football';
        default: return '';
    }
}

if (isLoading) return <p>Loading article...</p>;
if (!article) return <p>Article not found.</p>;

return (
    <div className={`single-article ${getTopic(article.topic)}`}>
    <h2>{article.title}</h2>
    <p>By: {article.author}</p>
    <p>{article.body}</p>
    <p>Created: {formatDate(article.created_at)}</p>
    <p>Number of votes: {article.votes}</p>
    <img src={article.article_img_url} alt={article.title} />
    <p>Number of comments: {article.comment_count}</p>
    <Link to='/' className='return-to-home'>Return to homepage.</Link>
    </div>
    );
}