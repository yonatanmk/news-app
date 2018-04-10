import { combineReducers } from 'redux';
import userReducer from './userReducer';
import sourceReducer from './sourceReducer';
import storiesReducer from './storiesReducer';
import isFetchingReducer from './isFetchingReducer';

export default combineReducers({
  isFetching: isFetchingReducer,
  user: userReducer,
  sources: sourceReducer,
  stories: storiesReducer,
});
