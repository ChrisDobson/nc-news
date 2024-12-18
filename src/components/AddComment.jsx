import { useState } from 'react';
import { postComment } from '../api';

export default function AddComment({ article_id, onAddComment }) {
    const [commentBody, setCommentBody] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const user = 'tickle122'; //Hardcoded user
    const max_comment_length = 500;

    const handleChange = (e) => {
        const newCommentBody = e.target.value;
        if (newCommentBody.length <= max_comment_length) {
            setCommentBody(newCommentBody);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentBody.trim()) {
            return;
        }

        setError(null);
        setSuccessMessage(null);

        const newComment = {
            username: user,
            body: commentBody,
        };
        
        postComment(article_id, newComment)
        .then((createdComment) => {
            onAddComment(createdComment);
            setCommentBody('');
            setSuccessMessage('Your comment was successfully posted!');
            setTimeout(() => setSuccessMessage(null), 3000);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to submit the comment. Please try again.');
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='body'>Add a comment:</label>
            <textarea name='body' id='body' value={commentBody} onChange={handleChange} required/>
            <button type='submit' disabled={commentBody.trim() === ''}>Submit</button>
            {error && <p className='error'>{error}</p>}
            {successMessage && <p className='success'>{successMessage}</p> }
        </form>
    );
}