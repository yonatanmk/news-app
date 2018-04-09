import axios from 'axios';
export const FETCH_SOURCES = 'FETCH_SOURCES';

export const fetchSources = () => dispatch => {
  axios
    .get('/api/source-list')
    .then(res => dispatch({ type: FETCH_SOURCES, payload: res.data }));
};
