import axios from 'axios';
import isFetching from './isFetching';

export const SET_SOURCES = 'SET_SOURCES';

export const fetchSources = () => dispatch => {
  isFetching.start(dispatch);
  return axios
    .get('/api/source-list')
    .then(res => dispatch({ type: SET_SOURCES, payload: res.data }))
    .finally(() => isFetching.stop(dispatch));
};
