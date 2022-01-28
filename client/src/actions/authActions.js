import API from '../misc/Interceptors';
import { AUTH, LOGOUT } from '../constants/actionType';

export const signIn = (userData, history) => async (dispatch) => {
    try {
        const { data } = await API.post(`/auth/singin`, userData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const signUp = (userData, history) => async (dispatch) => {
    try {
        const { data } = await API.post(`/auth/singup`, userData);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const guestLogIn = (history) => async (dispatch) => {
    try {
        const { data } = await API.get(`/auth/guest`);
        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};

export const isValid = () => async (dispatch) => {
    try {
        const { data } = await API.get(`/auth/isValid`);
        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
};

export const logout = (history) => async (dispatch) => {
    try {
        await API.delete(`/auth/logout`);
        dispatch({ type: LOGOUT });
        history.push('/');
    } catch (error) {
        console.log(error);
    }
};