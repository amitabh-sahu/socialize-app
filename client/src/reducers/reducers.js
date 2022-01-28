import { combineReducers } from 'redux';

import posts from './postReducer';
import auth from './authReducer';
import user from './userReducer';

export const reducers = combineReducers({ posts, auth, user });