import axios from 'axios';
export const FETCH_USER = 'FETCH_USER';

export const fetchUser = () => dispatch => {
  return axios
    .get('/api/current_user')
    .then(res => dispatch({ type: FETCH_USER, payload: res.data }));
};
