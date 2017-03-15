import { eventChannel } from 'redux-saga';
import { fork, take, call, put, takeLatest } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import storage from 'electron-json-storage';
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  CHECK_FOR_LOCAL_KEYS,
 } from './constants';
import * as actions from './actions';

function watchChannel() {
  return eventChannel((emitter) => {
    const replyHandler = (event, arg) => {
      console.log('replyHandler', arg);
      if (arg.success) {
        emitter({ type: SIGN_IN_SUCCESS, data: arg.success });
      } else {
        emitter({ type: SIGN_IN_ERROR, data: arg.error });
      }
    };

    ipcRenderer.on('ebaySignInResponse', replyHandler);

    return () => console.log('Socket off');
  });
}

function setKeys(data) {
  return new Promise((resolve, reject) => {
    storage.set('keys', JSON.stringify(data), (error) => {
      if (error) {
        reject();
      }
      resolve();
    });
  });
}

function* ebayReceiveData(channel) {
  while (true) {
    const action = yield take(channel);
    if (action.type === SIGN_IN_SUCCESS) {
      try {
        yield call(setKeys, action.data.success);
        yield put(actions.signInSuccess(action.data.success));
      } catch (err) {
        yield put(actions.signInError(action.data.error));
      }
    }
    if (action.type === SIGN_IN_ERROR) {
      yield put(actions.signInError(action.data.error));
    }
  }
}

function ebaySignIn() {
  ipcRenderer.send('ebaySignIn');
}

function* watchEbaySignIn() {
  yield takeLatest(SIGN_IN_START, ebaySignIn);
}

function getKeys() {
  return new Promise((resolve, reject) => {
    storage.get('keys', (error, keys) => {
      const parsedKeys = JSON.parse(keys);
      if (Object.keys(parsedKeys).length !== 0) {
        resolve(parsedKeys);
      }
      reject();
    });
  });
}

function* checkForKeys() {
  try {
    const keys = yield call(getKeys);
    yield put(actions.signInSuccess(keys));
  } catch (err) {
    yield put(actions.signInStart());
  }
}

function* watchCheckForKeys() {
  yield takeLatest(CHECK_FOR_LOCAL_KEYS, checkForKeys);
}

export default function* rootSaga() {
  const channel = yield call(watchChannel);
  yield fork(ebayReceiveData, channel);
  yield fork(watchEbaySignIn);
  yield fork(watchCheckForKeys);
}
