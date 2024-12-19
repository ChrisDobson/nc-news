import { useState } from 'react';
import { postComment } from '../api';

export default function AddComment({ article_id, onAddComment }) {
    const [commentBody, setCommentBody] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [characterCount, setCharacterCount] = useState(0);

    const user = 'guest'; //Hardcoded user
    const max_comment_length = 1000;

    const handleChange = (e) => {
        const newCommentBody = e.target.value;
        if (newCommentBody.length <= max_comment_length) {
            setCommentBody(newCommentBody);
            setCharacterCount(newCommentBody.length);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentBody.trim() === '') {
            setError('Comment cannot be empty.');
            return;
        }
        setError(null);
        setSuccessMessage(null);
        setLoading(true);

        postComment(article_id, { username: user, body: commentBody })
        .then((newComment) => {
            onAddComment(newComment);
            setSuccessMessage('Your comment was successfully posted!');
            setCommentBody('');
            setCharacterCount(0);
        })
        .catch((err) => {
            console.log(err);
            setError('Failed to post comment. Please try again.');
        })
        .finally(() => {
            setLoading(false);
        });
    };
    
    return (
        <div className='add-comment'>
            <form onSubmit={handleSubmit}>
                <textarea value={commentBody} onChange={handleChange} placeholder='Add a comment' rows='4' maxLength={max_comment_length}/>
                <div className='comment-footer'>
                    <div className='character-count'>
                        {characterCount}/{max_comment_length} characters
                    </div>
                    <button type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
                </div>
            </form>
            {error && <p className='error'>{error}</p>}
            {successMessage && <p className='success'>{successMessage}</p> }
        </div>
    );
}