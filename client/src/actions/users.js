import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => dispatch => {
  return axios
    .get('/api/current-user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};

export const addUserStory = story => dispatch => {
  return axios
    .post('/api/add-user-story', { story })
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }))
};
