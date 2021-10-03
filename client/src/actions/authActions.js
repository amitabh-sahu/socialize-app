import axios from 'axios';
import { AUTH } from '../constants/actionType';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (userData, history) => async (dispatch) => {
    try {
        const { data } = await API.post(`/users/singin`, userData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (userData, history) => async (dispatch) => {
    try {
        const { data } = await API.post(`/users/singup`, userData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};