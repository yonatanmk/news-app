import axios from 'axios';
import isFetching from './isFetching';

export const FETCH_STORIES = 'FETCH_STORIES';

export const fetchStories = sourceId => dispatch => {
  dispatch(isFetching.start());
  return axios
    .post('/api/stories', { sourceId })
    .then(res => dispatch({ type: FETCH_STORIES, payload: res.data.articles }))
    .finally(() => dispatch(isFetching.stop()));
};
