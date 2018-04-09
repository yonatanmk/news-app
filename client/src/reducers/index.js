import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sourceReducer from './sourceReducer';
import storiesReducer from './storiesReducer';
import isFetchingReducer from './isFetchingReducer';

export default combineReducers({
  isFetching: isFetchingReducer,
  auth: authReducer,
  sources: sourceReducer,
  stories: storiesReducer,
});
