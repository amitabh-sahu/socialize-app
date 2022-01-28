import axios from 'axios';
import decode from 'jwt-decode';
import { store } from './store';
import { LOGOUT } from '../constants/actionType';

axios.defaults.withCredentials = true;
const isProduction = process.env.NODE_ENV === 'production';
const BaseURL = isProduction ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000';
const API = axios.create({ baseURL: BaseURL });
const { dispatch } = store;

const refresh = async () => {
    try {
        const { data } = await axios.get(`${BaseURL}/auth/refresh`);
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    } catch (error) {
        if (error.response.status === 403) {
            dispatch({ type: LOGOUT });
        }
        console.log(error);
    }
};

API.interceptors.request.use(
    async (req) => {
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = decode(accessToken);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                accessToken = await refresh();
            }
            req.headers.Authorization = `Bearer ${accessToken}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;