
import {
  TOGGLE_DOWNLOADING_FLAG,
  GET_NEW_ORDERS,
  SET_EDIT_INDEX,
  RESET_EDIT_INDEX,
  EDIT_ORDER,
  SAVE_NEW_ORDERS,
  RESET_STATE,
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

export function setEditIndex(payload) {
  return {
    type: SET_EDIT_INDEX,
    payload,
  };
}

export function resetEditIndex(payload) {
  return {
    type: RESET_EDIT_INDEX,
    payload,
  };
}

export function editOrder(payload) {
  return {
    type: EDIT_ORDER,
    payload,
  };
}

export function saveNewOrders(payload) {
  return {
    type: SAVE_NEW_ORDERS,
    payload,
  };
}

export function resetState() {
  return { type: RESET_STATE };
}
