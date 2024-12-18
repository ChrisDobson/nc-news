import { Link } from 'react-router-dom';

export default function ArticleCards ({ articles }) {
    return (
        <ul id="articles-list">
            {articles.map((article) => (
                <li key={article.article_id} className={`article-card ${article.topic}`}>
                    <Link to={`/articles/${article.article_id}`} className='article-card-link'>
                    <h3>{article.title}</h3>
                    </Link>
                    </li>
            ))}
        </ul>
    );
}