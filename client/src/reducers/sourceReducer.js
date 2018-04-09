import { FETCH_SOURCES } from '../actions/types';

const defaultSources = [];

export default function (state = defaultSources, action) {
  switch (action.type) {
    case FETCH_SOURCES:
      return action.payload || state;
    default:
      return state;
  }
}
