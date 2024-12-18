import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentCards from './CommentCards';
import Collapsible from './Collapsible';
import AddComment from './AddComment';
import { getArticleById, getCommentsById, patchArticle } from '../api';
import { format } from 'date-fns';

export default function SingleArticle({ currUser }) {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticleById(article_id)
        .then((articleResponse) => {
            setArticle(articleResponse.article);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to fetch the article.');
            setIsLoading(false);
        });
    }, [article_id]);

    useEffect(() => {
        getCommentsById(article_id)
        .then((commentsResponse) => {
            setComments(commentsResponse.comments || []);
        })
        .catch((err) => {
            console.log(err);
            setComments([]);
        });
    }, [article_id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };
    
    const handleVote = (voteChange) => {
        const previousVotes = article.votes;
        setArticle((currArticle) => ({
            ...currArticle, votes: currArticle.votes + voteChange,
    }));
    
    patchArticle(article_id, voteChange)
    .catch((err) => {
        console.log(err);
        setArticle((currArticle) => ({
            ...currArticle, votes: previousVotes,
        }));
    });
};

const handleAddComment = (newComment) => {
    setComments((currComments) => [newComment, ...currComments]);
};

const handleCommentDelete = (comment_id) => {
    setComments((currComments) => currComments.filter((comment) =>
    comment.comment_id !== comment_id)
);
}

if (isLoading) return <p>Loading article...</p>;
if (error) return <p>{error}</p>;
if (!article) return <p>Article not found.</p>;

return (
    <div className={`single-article ${article.topic}`}>
        <h2>{article.title}</h2>
        <p><strong>By:</strong> {article.author}</p>
        <p>{article.body}</p>
        <p><strong>Posted:</strong> {formatDate(article.created_at)}</p>
        <p><strong>Number of votes:</strong> {article.votes}</p>
        <div className='vote-buttons'>
            <button onClick={() => handleVote(1)}>Upvote</button>
            <button onClick={() => handleVote(-1)}>Downvote</button>
        </div>
        <img src={article.article_img_url} alt={article.title}/>
        <h3>Comments</h3>
        <AddComment article_id={article_id} onAddComment={handleAddComment}/>
        <Collapsible>
            <CommentCards comments={comments} currUser="tickle122" onCommentDelete={handleCommentDelete}/>
        </Collapsible>
        <br/>
        <Link to='/' className='return-to-home'>Return to home</Link>
    </div>
    );
}