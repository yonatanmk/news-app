import axios from 'axios';
import { FETCH_USER, FETCH_SOURCES } from './types';

export const fetchUser = () => dispatch => {
  axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const fetchSources = () => dispatch => {
  axios
    .get('/api/source-list')
    .then(res => dispatch({ type: FETCH_SOURCES, payload: res.data }));
};
