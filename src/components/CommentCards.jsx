import { useState } from 'react';
import { deleteComment } from '../api';
import { format } from 'date-fns';

export default function CommentCards ({ comments, currUser, onCommentDelete }) {
    const [deleting, setDeleting] = useState(null);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };
    if (!comments || comments.length === 0) {
        return <p>There are currently no comments for this article.</p>;
    }
    
    const handleDelete = (comment_id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment? This action cannot be undone.');
        if (!confirmDelete) return;

        setDeleting(comment_id);
        deleteComment(comment_id).then(() => {
            onCommentDelete(comment_id);
        })
        .catch((err) => {
            console.error('Failed to delete the comment', err);
            alert('An error occured while trying to delete the comment.');
        })
        .finally(() => {
            setDeleting(null);
        });
    };

    return (
        <ul id="comments-list">
            {comments.map((comment) => (
                <li key={comment.comment_id} className='comment-card'>
                    <p><strong>By:</strong> {comment.author}</p>
                    <p>{comment.body}</p>
                    <p><strong>Posted:</strong> {formatDate(comment.created_at)}</p>
                    <p><strong>Votes:</strong> {comment.votes}</p>
                    {comment.author === currUser && (
                        <button onClick={() =>
                            handleDelete(comment.comment_id)}
                            disabled={deleting === comment.comment_id}
                        >{deleting === comment.comment_id ? 'Deleting...' : 'Delete'}</button>
                    )}
                    </li>
            ))}
        </ul>
    );
}