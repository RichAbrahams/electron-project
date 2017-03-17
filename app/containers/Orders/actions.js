import {
  GET_UNFULFILLED_ORDERS,
  COMPLETE_UNFULFILLED_ORDERS_SUCCESS,
  COMPLETE_UNFULFILLED_ORDERS_ERROR,
} from './constants';

export function getUnfulfilledOrders() {
  console.log('action GET_UNFULFILLED_ORDERS');
  return {
    type: GET_UNFULFILLED_ORDERS,
  };
}

export function completeUnfulfilledOrdersSuccess(payload) {
  return {
    type: COMPLETE_UNFULFILLED_ORDERS_SUCCESS,
    payload,
  };
}

export function completeUnfulfilledOrdersError(payload) {
  return {
    type: COMPLETE_UNFULFILLED_ORDERS_ERROR,
    payload,
  };
}
