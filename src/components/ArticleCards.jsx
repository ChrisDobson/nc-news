import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

export default function ArticleCards ({ articles }) {
    return (
        <ul className='articles-container'>
            {articles.map((article) => (
                <li key={article.article_id} className={`article-card ${article.topic}`}>
                    <Link to={`/articles/${article.article_id}`} className='article-card-link'>
                    <h3>{article.title}</h3>
                    <p>By: {article.author}</p>
                    <p>{formatDate(article.created_at)}</p>
                    {/* <p>Comments: {article.comment_count}</p>
                    <p>Votes: {article.votes}</p> */}
                    <div className='article-thumbnail'>
                        <img src={article.article_img_url} alt={`${article.title} thumbnail`} className='thumbnail'/>
                    </div>
                    </Link>
                    </li>
            ))}
        </ul>
    );
}