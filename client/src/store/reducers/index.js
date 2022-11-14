import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import { candidates, currentCandidates } from './candidates';

export default combineReducers({
  auth,
  error,
  candidates,
  currentCandidates,
});
