import axios from 'axios';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_DISLIKE } from '../constants/actionType';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await API.get(`/posts`);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const addPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await API.post(`/posts`, newPost);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/posts/${id}`, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await API.delete(`/posts/${id}`);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const postSentiment = (id, type) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/posts/${id}/${type}`);
        dispatch({ type: LIKE_DISLIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};