import { GET_ME } from '../constants/actionType';

const authReducer = (user = null, action) => {
    switch (action.type) {
        case GET_ME:
            return user = action.data;
        default:
            return user;
    }
};

export default authReducer;