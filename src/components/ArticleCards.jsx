import { Link } from 'react-router-dom';
import { format } from 'date-fns';


export default function ArticleCards ({ articles }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'dd MMM yyyy');
    };

    return (
        <ul id="articles-list">
            {articles.map((article) => (
                <li key={article.article_id} className={`article-card ${article.topic}`}>
                    <Link to={`/articles/${article.article_id}`} className='article-card-link'>
                    <h3>{article.title}</h3>
                    <p>{formatDate(article.created_at)}</p>
                    <p>Comments: {article.comment_count} Votes: {article.votes}</p>
                    </Link>
                    </li>
            ))}
        </ul>
    );
}