import { combineReducers } from 'redux';

import posts from './postReducer';
import auth from './authReducer';

export const reducers = combineReducers({ posts, auth });