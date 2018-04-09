import axios from 'axios';
export const FETCH_STORIES = 'FETCH_STORIES';

export const fetchStories = sourceId => dispatch => {
  return axios
    .post('/api/stories', { sourceId })
    .then(res => dispatch({ type: FETCH_STORIES, payload: res.data.articles }));
    // .then(res => dispatch({ type: FETCH_STORIES, payload: [1] }));
};
