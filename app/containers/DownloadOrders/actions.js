
import {
  TOGGLE_DOWNLOADING_FLAG,
  GET_NEW_ORDERS,
  GET_NEW_ORDERS_SUCCESS,
  GET_NEW_ORDERS_ERROR,
} from './constants';

export function toggleDownloadingFlag() {
  return {
    type: TOGGLE_DOWNLOADING_FLAG,
  };
}

export function getNewOrders(payload) {
  return {
    type: GET_NEW_ORDERS,
    payload,
  };
}
