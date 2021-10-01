import { combineReducers } from 'redux';

const posts = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...state, action.payload];
        case 'UPDATE':
        case 'LIKE_DISLIKE':
            return state.map((each) => each._id === action.payload._id ? action.payload : each);
        case 'DELETE':
            return state.filter((each) => each._id !== action.payload);
        default:
            return state;
    }
};

export const reducers = combineReducers({ posts });