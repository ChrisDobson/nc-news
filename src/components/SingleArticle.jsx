import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Votes from './Votes';
import AddComment from './AddComment';
import Collapsible from './Collapsible';
import CommentCards from './CommentCards';
import { getArticleById, getCommentsById, patchArticle } from '../api';
import topicEmojis from '../utils/topicEmojis';
import formatDate from '../utils/formatDate';

export default function SingleArticle({ currUser }) {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isVotingDisabled, setIsVotingDisabled] = useState(false);
    const [voteError, setVoteError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
        .then((articleResponse) => {
            setArticle(articleResponse.article);
        })
        .catch(() => {
            setError('Failed to fetch the article.');
        });
        getCommentsById(article_id)
        .then((commentsResponse) => {
            setComments(commentsResponse.comments || []);
        })
        .catch(() => {
            setError((prevError) => (prevError ? prevError + ' Failed to fetch comments.' : 'Failed to fetch comments.'));
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [article_id]);
    
    const handleVote = (voteChange) => {
        if (!article) return;
        const previousVotes = article.votes;
        setIsVotingDisabled(true);
        setVoteError(null);
        setArticle((currArticle) => ({ ...currArticle, votes: currArticle.votes + voteChange }));
    
    patchArticle(article_id, voteChange)
    .catch(() => {
        setArticle((currArticle) => ({ ...currArticle, votes: previousVotes}));
        setVoteError('Failed to update vote. Please try again.');
    })
    .finally(() => {
        setIsVotingDisabled(false);
    });
};

const handleAddComment = (newComment) => {
    setComments((currComments) => [newComment, ...currComments]);
};

const handleCommentDelete = (comment_id) => {
    setComments((currComments) => currComments.filter((comment) => comment.comment_id !== comment_id)
);
}

if (isLoading) return <p>Loading article...</p>;
if (error && !article) return <p>{error}</p>;

return (
    <div className={`single-article ${article.topic}`}>
        <h2>{article.title} {topicEmojis[article.topic]}</h2>
        <p><em>{article.author}</em></p>
        <p>{article.body}</p>
        <p><strong>{formatDate(article.created_at)}</strong></p>
        <Votes votes={article.votes} onVote={handleVote} isVotingDisabled={isVotingDisabled}/>
        {voteError && <p className='error-message'>{voteError}</p>}
        <img src={article.article_img_url} alt={article.title}/>
        <h3>Comments</h3>
        <AddComment article_id={article_id} onAddComment={handleAddComment}/>
        <br/>
        <Collapsible>
            <CommentCards comments={comments} currUser='guest' onCommentDelete={handleCommentDelete}/>
        </Collapsible>
        <br/>
        <Link to='/' className='return-to-home'>Return to home</Link>
    </div>
    );
}