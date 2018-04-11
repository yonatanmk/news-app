import { SET_SOURCES } from '../actions/types';

const defaultSources = [];

export default function (state = defaultSources, action) {
  switch (action.type) {
    case SET_SOURCES:
      return action.payload || state;
    default:
      return state;
  }
}
