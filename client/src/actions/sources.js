import axios from 'axios';
import isFetching from './isFetching';

export const FETCH_SOURCES = 'FETCH_SOURCES';

export const fetchSources = () => dispatch => {
  dispatch(isFetching.start());
  return axios
    .get('/api/source-list')
    .then(res => dispatch({ type: FETCH_SOURCES, payload: res.data }))
    .finally(() => dispatch(isFetching.stop()));
};
