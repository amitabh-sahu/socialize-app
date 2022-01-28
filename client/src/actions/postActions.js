import API from '../misc/Interceptors';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_DISLIKE } from '../constants/actionType';

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await API.get(`/post`);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const addPost = (newPost) => async (dispatch) => {
    try {
        const { data } = await API.post(`/post`, newPost);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/post/${id}`, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await API.delete(`/post/${id}`);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const postSentiment = (id, type) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/post/${id}/${type}`);
        dispatch({ type: LIKE_DISLIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};