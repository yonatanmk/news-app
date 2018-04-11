import { FETCH_STORIES } from '../actions/types';

const defaultStories = [];

export default function (state = defaultStories, action) {
  switch (action.type) {
    case FETCH_STORIES:
      return action.payload || false;
    default:
      return state;
  }
}
