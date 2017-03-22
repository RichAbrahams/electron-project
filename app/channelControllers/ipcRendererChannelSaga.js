import { eventChannel, delay } from 'redux-saga';
import {
  fork,
  take,
  takeEvery,
  takeLatest,
  call,
  put,
  select
} from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import { SIGN_IN, REFRESH_TOKEN } from '../containers/NavBar/constants';
import { GET_NEW_ORDERS } from '../containers/DownloadOrders/constants';

export const RESPONSE_FROM_MAIN = 'ipcRendererChannelSaga/RESPONSE_FROM_MAIN';

function watchChannel() {
  return eventChannel((emitter) => {
    const replyHandler = (event, arg) => {
      emitter({ type: RESPONSE_FROM_MAIN, arg });
    };

    ipcRenderer.on('messageFromMain', replyHandler);

    return () => console.log('Socket off');
  });
}

function * receiveResponse(channel) {
  while (true) {
    const action = yield take(channel);
    yield put(action.arg);
  }
}

function transmitToMain(action) {
  console.log('transmitToMain', action);
  ipcRenderer.send('messageFromRenderer', action);
}

function * watchForChannelActions() {
  yield takeEvery([
    SIGN_IN, REFRESH_TOKEN, GET_NEW_ORDERS
  ], transmitToMain);
}

export default function * rootSaga() {
  const channel = yield call(watchChannel);
  yield fork(receiveResponse, channel);
  yield fork(watchForChannelActions);
}
