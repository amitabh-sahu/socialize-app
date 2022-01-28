import { AUTH, LOGOUT } from '../constants/actionType';

const authReducer = (auth = false, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('accessToken', action.data.accessToken);
            return auth = true;
        case LOGOUT:
            localStorage.clear();
            return auth = false;
        default:
            return auth;
    }
};

export default authReducer;