import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCards from './CommentCards';
import Collapsible from './Collapsible';
import { getArticleById, getCommentsById } from '../api';
import { format } from 'date-fns';

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([getArticleById(article_id), getCommentsById(article_id)])
        .then(([articleResponse, commentsResponse]) => {
            setArticle(articleResponse.article);
            setComments(commentsResponse.comments);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to fetch the article or comments.');
            setIsLoading(false);
        });
    }, [article_id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };

const getTopic = (topic) => {
    switch (topic) {
        case 'coding': return 'coding';
        case 'cooking': return 'cooking';
        case 'football': return 'football';
        default: return '';
    }
}

const handleClick = () => {
    setArticle((currArticle) => ({
        ...currArticle, votes: currArticle.votes + 1,
    }));
};

if (isLoading) return <p>Loading article...</p>;
if (error) return <p>{error}</p>;
if (!article) return <p>Article not found.</p>;

return (
    <div className={`single-article ${getTopic(article.topic)}`}>
    <h2>{article.title}</h2>
    <p><strong>By:</strong> {article.author}</p>
    <p>{article.body}</p>
    <p><strong>Created:</strong> {formatDate(article.created_at)}</p>
    <p><strong>Number of votes:</strong> {article.votes}</p>
    <button onClick={handleClick} className='button'>Upvote</button>
    <img src={article.article_img_url} alt={article.title} className='image'/>
    <Collapsible>
    <CommentCards comments={comments}/>
    </Collapsible>
    <br/>
    <Link to='/' className='return-to-home'>Return to home</Link>
    </div>
    );
}