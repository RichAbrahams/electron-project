import {
  INITIALIZE_CREDENTIALS,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR
} from './constants';

export function initializeCredentials() {
  return { type: INITIALIZE_CREDENTIALS };
}

export function signIn() {
  return { type: SIGN_IN };
}

export function signInSuccess(payload) {
  return { type: SIGN_IN_SUCCESS, payload };
}

export function signInError(payload) {
  return { type: SIGN_IN_ERROR, payload };
}

export function refreshToken(payload) {
  return { type: REFRESH_TOKEN, payload };
}

export function refreshTokenSuccess(payload) {
  return { type: REFRESH_TOKEN_SUCCESS, payload };
}

export function refreshTokenError(payload) {
  return { type: REFRESH_TOKEN_ERROR, payload };
}
