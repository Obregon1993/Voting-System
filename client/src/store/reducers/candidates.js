import { SET_CANDIDATES, SET_CURRENT_CANDIDATES } from '../actionTypes';

export const candidates = (state = [], action) => {
  switch (action.type) {
    case SET_CANDIDATES:
      return action.candidates;

    default:
      return state;
  }
};

export const currentCandidates = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_CANDIDATES:
      return action.candidate;

    default:
      return state;
  }
};
