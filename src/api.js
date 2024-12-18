import axios from 'axios';

const api = axios.create({ baseURL: 'https://my-nc-news-2zd4.onrender.com/api' });

export function getArticles(topic = null, { sort_by = 'created_at', order = 'desc' } = {}) {
    const params = { sort_by, order, limit: 50 };
    if (topic) {
        params.topic = topic;
    }
    return api.get('/articles', { params })
    .then(({ data }) => data.articles || []);
}

export function getArticleById(article_id) {
    return api.get(`/articles/${article_id}`)
    .then(({ data }) => {
        return data;
    });
}

export function getCommentsById(article_id) {
    return api.get(`/articles/${article_id}/comments`)
    .then(({ data }) => {
        return data;
    });
}

export function patchArticle(article_id, voteChange) {
    return api.patch(`/articles/${article_id}`, { inc_votes: voteChange })
    .then(({ data }) => {
        return data.article;
    });
}

export function postComment(article_id, newComment) {
    return api.post(`/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
        return data.comment;
    });
}

export function deleteComment(comment_id) {
    return api.delete(`/comments/${comment_id}`)
    .then(() =>
    console.log(`Comment successfully deleted!`));
}