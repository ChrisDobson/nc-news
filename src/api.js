import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-nc-news-2zd4.onrender.com/api',
});

export function getArticles(topic) {
    const params = { topic, limit: 1000 };
    return api.get('/articles', { params }).then(({ data }) => {
        return data.articles;
    });
}