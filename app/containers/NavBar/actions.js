
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CHECK_FOR_LOCAL_KEYS,
} from './constants';

export function signInStart() {
  return {
    type: SIGN_IN_START
  };
}

export function signInSuccess(data) {
  return {
    type: SIGN_IN_SUCCESS,
    data,
  };
}

export function signInError(err) {
  return {
    type: SIGN_IN_ERROR,
    err,
  };
}

export function checkForLocalKeys() {
  return {
    type: CHECK_FOR_LOCAL_KEYS,
  };
}

