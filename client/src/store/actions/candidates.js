import api from '../../services/api';
import { SET_CANDIDATES, SET_CURRENT_CANDIDATES } from '../actionTypes';
import { addError, removeError } from './error';

export const setCandidates = (candidates) => ({
  type: SET_CANDIDATES,
  candidates,
});

export const setCurrentCandidates = (candidate) => ({
  type: SET_CURRENT_CANDIDATES,
  candidate,
});

export const getCandidates = () => {
  return async (dispatch) => {
    try {
      const candidates = await api.call('get', 'candidates');
      dispatch(setCandidates(candidates));
      dispatch(removeError());
    } catch (error) {
      const err = error.response.data;
      dispatch(addError(err.message));
    }
  };
};

export const getUserCandidates = () => {
  return async (dispatch) => {
    try {
      const candidates = await api.call('get', 'candidates/user');
      dispatch(setCandidates(candidates));
      dispatch(removeError());
    } catch (error) {
      const err = error.response.data;
      dispatch(addError(err.message));
    }
  };
};

export const createCandidates = (data) => {
  return async (dispatch) => {
    try {
      const candidates = await api.call('post', 'candidates', data);
      dispatch(setCurrentCandidates(candidates));
      dispatch(removeError());
    } catch (error) {
      const err = error.response.data;
      dispatch(addError(err.message));
    }
  };
};

export const getCurrentCandidates = (path) => {
  return async (dispatch) => {
    try {
      const candidates = await api.call('get', `candidates/${path}`);
      dispatch(setCurrentCandidates(candidates));
      dispatch(removeError());
    } catch (error) {
      const err = error.response.data;
      dispatch(addError(err.message));
    }
  };
};

export const vote = (path, data) => {
  return async (dispatch) => {
    try {
      const candidates = await api.call('post', `candidates/${path}`, data);
      dispatch(setCurrentCandidates(candidates));
      dispatch(removeError());
    } catch (error) {
      const err = error.response.data;
      dispatch(addError(err.message));
    }
  };
};
