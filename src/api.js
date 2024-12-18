import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-nc-news-2zd4.onrender.com/api',
});

export function getArticles(topic = null) {
    const params = topic ? { topic, limit: 50 } : { limit: 100};
    return api.get('/articles', { params })
    .then(({ data }) => {
        return data.articles || [];
    });
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