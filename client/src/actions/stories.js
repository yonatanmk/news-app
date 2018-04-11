import axios from 'axios';
import isFetching from './isFetching';

export const FETCH_STORIES = 'FETCH_STORIES';

export const fetchStories = sourceId => dispatch => {
  isFetching.start(dispatch);
  return axios
    .post('/api/stories', { sourceId })
    .then(res => dispatch({ type: FETCH_STORIES, payload: res.data.articles }))
    .catch(err => {
      alert('There was an error getting today\'s news stories.');
      dispatch({ type: FETCH_STORIES, payload: null });
    })
    .finally(() => isFetching.stop(dispatch));
};
