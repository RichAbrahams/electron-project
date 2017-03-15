import mongoFetchNewOrders from '../../mongoController/mongoFetchNewOrders';

import {
  TOGGLE_DOWNLOADING_FLAG,
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_ERROR,
} from './constants';

export function toggleDownloadingFlag() {
  return {
    type: TOGGLE_DOWNLOADING_FLAG,
  };
}

export function fetchOrdersSuccess() {
  return {
    type: FETCH_ORDERS_SUCCESS,
  };
}

export function fetchOrdersError() {
  return {
    type: FETCH_ORDERS_ERROR,
  };
}

function fetchOrders(forPerson) {
  return function (dispatch) {
    return mongoFetchNewOrders().then(
      orders => dispatch(fetchOrdersSuccess(orders)),
      error => dispatch(fetchOrdersError())
    );
  };
}