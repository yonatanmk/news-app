import axios from 'axios';
import { notify } from 'react-notify-toast';
import isFetching from './isFetching';
import { SET_SOURCES } from './sources';

export const SET_USER = 'SET_USER';

export const fetchUser = () => dispatch => {
  isFetching.start(dispatch);
  return axios
    .get('/api/current-user')
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .finally(() => isFetching.stop(dispatch));
};

export const addUserStory = story => dispatch => {
  return axios
    .post('/api/add-user-story', { story })
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .then(() => notify.show('Story Saved To Your Profile', 'success', 2000));
};

export const removeUserStory = title => dispatch => {
  return axios
    .post('/api/remove-user-story', { title })
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .then(() => notify.show('Story Removed From Your Profile', 'error', 2000));
};

export const setUserSources = sources => dispatch => {
  isFetching.start(dispatch);
  return axios
    .post('/api/set-user-sources', {sources})
    .then(res => dispatch({ type: SET_USER, payload: res.data }))
    .then(() => axios.get('/api/source-list'))
    .then(res => dispatch({ type: SET_SOURCES, payload: res.data }))
    .finally(() => isFetching.stop(dispatch));
};
