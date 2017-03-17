import { eventChannel } from 'redux-saga';
import { fork, take, takeLatest, call, put } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';
import { GET_UNFULFILLED_ORDERS, GET_UNFULFILLED_ORDERS_SUCCESS, GET_UNFULFILLED_ORDERS_ERROR } from './constants';
import * as actions from './actions';

function watchChannel() {
  return eventChannel((emitter) => {
    const getUnfulfilledOrdersReplyHandler = (event, arg) => {
      console.log('getUnfulfilledOrdersReplyHandler', arg);
      if (arg.error) {
        console.log('watchChannel error found');
        emitter({ type: GET_UNFULFILLED_ORDERS_ERROR, arg });
      } else {
        console.log('watchChannel success found');
        emitter({ type: GET_UNFULFILLED_ORDERS_SUCCESS, arg });
      }
    };

    ipcRenderer.on('getUnfulfilledOrdersResponse', getUnfulfilledOrdersReplyHandler);

    return () => console.log('Socket off');
  });
}

function * receiveData(channel) {
  while (true) {
    const action = yield take(channel);
    console.log('receiveData');
    if (action.type === GET_UNFULFILLED_ORDERS_SUCCESS) {
      yield put(actions.completeUnfulfilledOrdersSuccess(action.arg));
    }
    if (action.type === GET_UNFULFILLED_ORDERS_ERROR) {
      yield put(actions.completeUnfulfilledOrdersError(action.arg));
    }
  }
}

function ipcUnfulfilledOrders(refreshToken) {
  console.log('ipcUnfulfilledOrders');
  ipcRenderer.send('getUnfullfilledOrders', refreshToken);
}

function * watchUnfulfilledOrders() {
  console.log('watchUnfulfilledOrders');
  yield takeLatest(GET_UNFULFILLED_ORDERS, ipcUnfulfilledOrders);
}

export default function * rootSaga() {
  const channel = yield call(watchChannel);
  yield fork(receiveData, channel);
  yield fork(watchUnfulfilledOrders);
}
