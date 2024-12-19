import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArticleCards from "./ArticleCards";
import { getArticles } from "../api";

export default function TopicArticles() {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticles(topic)
        .then((articlesFromApi) => {
            setArticles(articlesFromApi);
            setIsLoading(false);
        })
        .catch((err) => {
            setError("Failed to fetch articles.");
            setIsLoading(false);
        });
    }, [topic]);

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>{error}</p>;
    if (articles.length === 0) return <p>No articles found for this topic.</p>;

    return (
        <div className={`topic-articles ${topic}`}>
            <h2 className='heading'>Articles on {topic}</h2>
            <ArticleCards articles={articles} />
        </div>
    );
}