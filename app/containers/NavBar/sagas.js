import { eventChannel, delay } from 'redux-saga';
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

// function watchChannel() {
//   return eventChannel((emitter) => {
//     const signInReplyHandler = (event, arg) => {
//       if (arg.error) {
//         emitter({ type: SIGN_IN_ERROR, arg });
//       } else {
//         emitter({ type: SIGN_IN_SUCCESS, arg });
//       }
//     };

//     const refreshReplyHandler = (event, arg) => {
//       if (arg.error) {
//         emitter({ type: REFRESH_KEYS_ERROR, arg });
//       } else {
//         emitter({ type: REFRESH_KEYS_SUCCESS, arg });
//       }
//     };

//     ipcRenderer.on('signInResponse', signInReplyHandler);
//     ipcRenderer.on('refreshKeysResponse', refreshReplyHandler);

//     return () => console.log('Socket off');
//   });
// }

// function * receiveData(channel) {
//   while (true) {
//     const action = yield take(channel);
//     if (action.type === SIGN_IN_SUCCESS) {
//       try {
//         yield call(setAllKeys, action.arg);
//         yield put(actions.completeSignInSuccess(action.arg));
//       } catch (err) {
//         yield put(actions.completeSignInError(err));
//       }
//     }
//     if (action.type === SIGN_IN_ERROR) {
//       yield put(actions.completeSignInError(action.arg));
//     }
//     if (action.type === REFRESH_KEYS_SUCCESS) {
//       try {
//         const refresh_token = yield select(selectors.selectRefreshToken());
//         const keys = Object.assign({}, action.arg, { refresh_token });
//         yield call(setRefreshedKeys, keys);
//         yield put(actions.completeRefreshKeySuccess(keys));
//         yield delay(3600000);
//         const selectedRefreshToken = yield select(selectors.selectRefreshToken());
//         yield put(actions.refreshKeys(selectedRefreshToken));
//       } catch (err) {
//         yield put(actions.signInStart());
//       }
//     }
//     if (action.type === REFRESH_KEYS_ERROR) {
//       yield put(actions.signInStart());
//     }
//   }
// }

// function signIn() {
//   ipcRenderer.send('signIn');
// }

// function * watchSignIn() {
//   yield takeLatest(SIGN_IN_START, signIn);
// }

// function refreshKeys(refreshToken) {
//   ipcRenderer.send('refreshKeys', refreshToken);
// }

// function * watchRefreshKeys() {
//   yield takeLatest(REFRESH_KEYS, refreshKeys);
// }

// function setAllKeys(keys) {
//   return new Promise((resolve, reject) => {
//     storage.set('keys', JSON.stringify(keys), (error) => {
//       if (error) {
//         reject();
//       }
//       resolve();
//     });
//   });
// }

// function setRefreshedKeys(keys) {
//   return new Promise(async (resolve, reject) => {
//     const oldKeys = await getKeys();
//     const newKeys = Object.assign({}, oldKeys, keys);
//     storage.set('keys', JSON.stringify(newKeys), (error) => {
//       if (error) {
//         reject();
//       }
//       resolve(newKeys);
//     });
//   });
// }

// function getKeys() {
//   return new Promise((resolve, reject) => {
//     storage.get('keys', (error, keys) => {
//       if (typeof keys !== 'string') {
//         reject();
//       } else {
//         resolve(JSON.parse(keys));
//       }
//     });
//   });
// }

// function * checkForKeys() {
//   try {
//     const keys = yield call(getKeys);
//     yield put(actions.restoreKeysToState(keys));
//     yield put(actions.refreshKeys(keys.refresh_token));
//   } catch (err) {
//     yield put(actions.signInStart());
//   }
// }

// function * watchCheckForKeys() {
//   yield takeLatest(CHECK_FOR_LOCAL_KEYS, checkForKeys);
// }

export default function * rootSaga() {
  // const channel = yield call(watchChannel);
  // yield fork(receiveData, channel);
  // yield fork(watchSignIn);
  // yield fork(watchCheckForKeys);
  // yield fork(watchRefreshKeys);
}
