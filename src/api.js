import axios from 'axios';

const api = axios.create({
    baseURL: 'https://my-nc-news-2zd4.onrender.com/api',
});

export function getArticles() {
    return api.get('/articles', { params: { limit: 100 } })
    .then(({ data }) => {
        return data.articles;
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

/*
NB: Below is my attempt to refactor everything without using Axios, to see if this allowed me to post comments. Unfortunately, it broke everything!

const BASE_URL = 'https://my-nc-news-2zd4.onrender.com/api';

const request = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    return response.json();
};

export function getArticles() {
    return request(`${BASE_URL}/articles?limit=100`, {
        method: 'GET',
    }).then((data) => data.articles)
        .catch((err) => {
        console.error('Error fetching articles:', err);
        throw err;
    });
}

export function getArticleById(article_id) {
    return request(`${BASE_URL}/articles/${article_id}`, {
        method: 'GET',
    }).then((data) => data.article)
        .catch((err) => {
        console.error(`Error fetching article with ID ${article_id}:`, err);
        throw err;
    });
}

export function getCommentsById(article_id) {
    return request(`${BASE_URL}/articles/${article_id}/comments`, {
        method: 'GET',
    }).then((data) => data.comments)
        .catch((err) => {
        console.error(`Error fetching comments for article ID ${article_id}:`, err);
        throw err;
    });
}

export function patchArticle(article_id, voteChange) {
    return request(`${BASE_URL}/articles/${article_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type' : 'application/json', },
        body: JSON.stringify({ inc_votes: voteChange }),
    }).then((data) => data.article)
        .catch((err) => {
        console.error(`Error updating article ID ${article_id}:`, err);
        throw err;
    });
}

export function postComment(article_id, newComment) {
    return request(`${BASE_URL}/articles/${article_id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json', },
        body: JSON.stringify(newComment),
    }).then((data) => data.comment)
        .catch((err) => {
        console.error(`Error posting comment for article ID ${article_id}:`, err);
        throw err;
    });
}

*/