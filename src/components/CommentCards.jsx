import { format } from 'date-fns';

export default function CommentCards ({ comments }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };
    if (!comments || comments.length === 0) {
        return <p>There are currently no comments for this article.</p>;
    }
    return (
        <ul id="comments-list">
            {comments.map((comment) => (
                <li key={comment.comment_id} className='comment-card'>
                    <p><strong>By:</strong> {comment.author}</p>
                    <p>{comment.body}</p>
                    <p><strong>Posted:</strong> {formatDate(comment.created_at)}</p>
                    <p><strong>Votes:</strong> {comment.votes}</p>
                    </li>
            ))}
        </ul>
    );
}