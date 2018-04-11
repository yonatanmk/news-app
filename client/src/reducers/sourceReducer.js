import { SET_SOURCES } from '../actions/types';

const defaultSources = [];

export default function (state = defaultSources, action) {
  switch (action.type) {
    case SET_SOURCES:
      return action.payload || false;
    default:
      return state;
  }
}
