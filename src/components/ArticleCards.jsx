import { Link } from 'react-router-dom';
import topicEmojis from '../utils/topicEmojis';
import formatDate from '../utils/formatDate';

export default function ArticleCards ({ articles }) {
    return (
        <ul className='articles-container'>
            {articles.map((article) => (
                <li key={article.article_id} className={`article-card ${article.topic}`}>
                    <Link to={`/articles/${article.article_id}`} className='article-card-link'>
                    <h3>{article.title} {topicEmojis[article.topic]}</h3>
                    <p><em>{article.author}</em></p>
                    <p>{formatDate(article.created_at)}</p>
                    <div className='article-thumbnail'>
                        <img src={article.article_img_url} alt={`${article.title} thumbnail`} className='thumbnail'/>
                    </div>
                    </Link>
                    </li>
            ))}
        </ul>
    );
}