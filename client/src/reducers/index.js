import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sourceReducer from './sourceReducer';
import storiesReducer from './storiesReducer';

export default combineReducers({
  auth: authReducer,
  sources: sourceReducer,
  stories: storiesReducer,
});
