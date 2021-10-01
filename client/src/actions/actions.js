import axios from 'axios';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_DISLIKE } from './actionType';

const url = 'http://localhost:5000/posts';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await axios.get(url);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const addPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await axios.post(url, newPost);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${url}/${id}`, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`${url}/${id}`);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error.message);
    }
};

export const postSentiment = (id, type) => async (dispatch) => {
    try {
        const { data } = await axios.patch(`${url}/${id}/${type}`);
        dispatch({ type: LIKE_DISLIKE, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};