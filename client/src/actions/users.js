import axios from 'axios';
import { notify } from 'react-notify-toast';
import isFetching from './isFetching';

export const SET_USER = 'SET_USER';

export const fetchUser = () => dispatch => {
  dispatch(isFetching.start());
  return axios
    .get('/api/current-user')
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .finally(() => dispatch(isFetching.stop()));
};

export const addUserStory = story => dispatch => {
  return axios
    .post('/api/add-user-story', { story })
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .then(() => notify.show("Story Saved To Your Profile", "success", 2000));
};

export const removeUserStory = title => dispatch => {
  return axios
    .post('/api/remove-user-story', { title })
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .then(() => notify.show("Story Removed From Your Profile", "error", 2000));
};
