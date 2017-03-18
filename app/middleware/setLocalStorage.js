import storage from 'electron-json-storage';
import {REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR, SIGN_IN_SUCCESS} from '../containers/NavBar/constants';
import {signIn} from '../containers/NavBar/actions';

function getOldKeys() {
  return new Promise((resolve, reject) => {
    storage.get('keys', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

function setNewKeys(newKeys) {
  return new Promise((resolve, reject) => {
    storage.set('keys', newKeys, (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

function refreshTokenSuccess(keys) {
  return new Promise(async function (resolve) {
    const oldKeys = await getOldKeys();
    const newKeys = Object.assign({}, oldKeys, { access_token: keys.access_token });
    await setNewKeys(newKeys);
    resolve();
  });
}

export default function ({dispatch}) {
  return function (next) {
    return async function (action) {
      if (action.type !== REFRESH_TOKEN_SUCCESS && action.type !== SIGN_IN_SUCCESS) {
        return next(action);
      }
      if (action.type === SIGN_IN_SUCCESS) {
        await setNewKeys(action.payload);
        return next(action);
      }
      if (action.type === REFRESH_TOKEN_SUCCESS) {
        await refreshTokenSuccess(action);
        return next(action);
      }
      if (action.type === REFRESH_TOKEN_ERROR) {
        dispatch(signIn());
      }
    };
  };
}
