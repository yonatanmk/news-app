import { combineReducers } from 'redux';
import authReducer from './authReducer';
import sourceReducer from './sourceReducer';

export default combineReducers({
  auth: authReducer,
  sources: sourceReducer,
});
