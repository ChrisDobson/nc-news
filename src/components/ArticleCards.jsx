import { Link } from 'react-router-dom';

export default function ArticleCards ({ articles }) {
    const getTopic = (topic) => {
    switch (topic) {
        case 'coding': return 'coding';
        case 'cooking': return 'cooking';
        case 'football': return 'football';
        default: return '';
    }
};
    return (
        <ul id="articles-list">
            {articles.map((article) => (
                <li key={article.article_id} className={`article-card ${getTopic(article.topic)}`}>
                    <Link to={`/articles/${article.article_id}`} className='article-card-link'>
                    <h3>{article.title}</h3>
                    </Link>
                    </li>
            ))}
        </ul>
    );
}