import { eventChannel } from 'redux-saga';
import {
  fork,
  take,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CHECK_FOR_LOCAL_KEYS,
  REFRESH_KEYS,
  REFRESH_KEYS_SUCCESS,
  REFRESH_KEYS_ERROR
} from './constants';
import * as actions from './actions';
import * as selectors from './selectors';

function watchChannel() {
  return eventChannel((emitter) => {
    const signInReplyHandler = (event, arg) => {
      if (arg.error) {
        emitter({ type: SIGN_IN_ERROR, arg });
      } else {
        emitter({ type: SIGN_IN_SUCCESS, arg });
      }
    };

    const refreshReplyHandler = (event, arg) => {
      if (arg.error) {
        emitter({ type: REFRESH_KEYS_ERROR, arg });
      } else {
        emitter({ type: REFRESH_KEYS_SUCCESS, arg });
      }
    };

    ipcRenderer.on('ebaySignInResponse', signInReplyHandler);
    ipcRenderer.on('ebayRefreshKeysResponse', refreshReplyHandler);

    return () => console.log('Socket off');
  });
}

function * ebayReceiveData(channel) {
  while (true) {
    const action = yield take(channel);
    if (action.type === SIGN_IN_SUCCESS) {
      try {
        yield call(setAllKeys, action.arg);
        yield put(actions.completeSignInSuccess(action.arg));
      } catch (err) {
        yield put(actions.completeSignInError(err));
      }
    }
    if (action.type === SIGN_IN_ERROR) {
      yield put(actions.completeSignInError(action.arg));
    }
    if (action.type === REFRESH_KEYS_SUCCESS) {
      try {
        const refresh_token = yield select(selectors.selectRefreshToken());
        const keys = Object.assign({}, action.arg, { refresh_token });
        yield call(setRefreshedKeys, keys);
        yield put(actions.completeRefreshKeySuccess(keys));
      } catch (err) {
        yield put(actions.signInStart());
      }
    }
    if (action.type === REFRESH_KEYS_ERROR) {
      yield put(actions.signInStart());
    }
  }
}

function ebaySignIn() {
  ipcRenderer.send('ebaySignIn');
}

function * watchEbaySignIn() {
  yield takeLatest(SIGN_IN_START, ebaySignIn);
}

function ebayRefreshKeys(refreshToken) {
  ipcRenderer.send('ebayRefreshKeys', refreshToken);
}

function * watchEbayRefreshKeys() {
  yield takeLatest(REFRESH_KEYS, ebayRefreshKeys);
}

function setAllKeys(keys) {
  return new Promise((resolve, reject) => {
    storage.set('keys', JSON.stringify(keys), (error) => {
      if (error) {
        reject();
      }
      resolve();
    });
  });
}

function setRefreshedKeys(keys) {
  return new Promise(async function (resolve, reject) {
    const oldKeys = await getKeys();
    const newKeys = Object.assign({}, oldKeys, keys);
    storage.set('keys', JSON.stringify(newKeys), (error) => {
      if (error) {
        reject();
      }
      resolve(newKeys);
    });
  });
}

function getKeys() {
  return new Promise((resolve, reject) => {
    storage.get('keys', (error, keys) => {
      if (typeof keys !== 'string') {
        reject();
      } else {
        resolve(JSON.parse(keys));
      }
    });
  });
}

function * checkForKeys() {
  try {
    const keys = yield call(getKeys);
    yield put(actions.restoreKeysToState(keys));
    yield put(actions.refreshKeys(keys.refresh_token));
  } catch (err) {
    yield put(actions.signInStart());
  }
}

function * watchCheckForKeys() {
  yield takeLatest(CHECK_FOR_LOCAL_KEYS, checkForKeys);
}

export default function * rootSaga() {
  const channel = yield call(watchChannel);
  yield fork(ebayReceiveData, channel);
  yield fork(watchEbaySignIn);
  yield fork(watchCheckForKeys);
  yield fork(watchEbayRefreshKeys);
}
