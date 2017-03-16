import {
  SIGN_IN_START,
  CHECK_FOR_LOCAL_KEYS,
  REFRESH_KEYS,
  COMPLETE_SIGN_IN_SUCCESS,
  COMPLETE_SIGN_IN_ERROR,
  COMPLETE_REFRESH_KEY_SUCCESS,
  COMPLETE_REFRESH_KEY_ERROR,
  RESTORE_KEYS_TO_STATE
} from './constants';

export function signInStart() {
  return { type: SIGN_IN_START };
}

export function checkForLocalKeys() {
  return { type: CHECK_FOR_LOCAL_KEYS };
}

export function restoreKeysToState(keys) {
  return { type: RESTORE_KEYS_TO_STATE, keys };
}

export function refreshKeys(refreshToken) {
  return { type: REFRESH_KEYS, refreshToken };
}

export function completeSignInSuccess(keys) {
  return { type: COMPLETE_SIGN_IN_SUCCESS, keys };
}

export function completeSignInError(error) {
  return { type: COMPLETE_SIGN_IN_ERROR, error };
}

export function completeRefreshKeySuccess(keys) {
  return { type: COMPLETE_REFRESH_KEY_SUCCESS, keys };
}

export function completeRefreshKeyError(error) {
  return { type: COMPLETE_REFRESH_KEY_ERROR, error };
}
