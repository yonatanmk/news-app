import axios from 'axios';
import isFetching from './isFetching';

export const SET_SOURCES = 'SET_SOURCES';

export const fetchSources = () => dispatch => {
  isFetching.start(dispatch);
  return axios
    .get('/api/source-list')
    .then(res => dispatch({ type: SET_SOURCES, payload: res.data }))
    .catch(err => {
      alert('There was an error getting today\'s news sources.');
      dispatch({ type: SET_SOURCES, payload: null });
    })
    .finally(() => isFetching.stop(dispatch));
};
