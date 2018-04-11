import axios from 'axios';
import isFetching from './isFetching';

export const SET_SOURCES = 'SET_SOURCES';

export const fetchSources = () => dispatch => {
  // dispatch(isFetching.start());
  return axios
    .get('/api/source-list')
    .then(res => dispatch({ type: SET_SOURCES, payload: res.data }))
    // .then(res => console.log(res.data))
    // .then(res => dispatch({ type: SET_SOURCES, payload: [1,2,3,4,5] }))
    // .finally(() => dispatch(isFetching.stop()));
};
