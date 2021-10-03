import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE_DISLIKE } from '../constants/actionType';

const postReducer = (allPosts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...allPosts, action.payload];
        case UPDATE:
        case LIKE_DISLIKE:
            return allPosts.map((each) => each._id === action.payload._id ? action.payload : each);
        case DELETE:
            return allPosts.filter((each) => each._id !== action.payload);
        default:
            return allPosts;
    }
};

export default postReducer;