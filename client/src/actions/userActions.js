import API from '../misc/Interceptors';
import { GET_ME } from '../constants/actionType';

export const getMe = () => async (dispatch) => {
    try {
        const { data } = await API.get(`/user/getMe`);
        dispatch({ type: GET_ME, data });
    } catch (error) {
        console.log(error);
    }
};