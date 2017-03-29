
import {
  GET_UNPRINTED_ORDERS,
  PRINT_ORDERS,
} from './constants';

export function getUnprintedOrders() {
  return {
    type: GET_UNPRINTED_ORDERS,
  };
}

export function printOrders() {
  console.log('print clicked');
  return {
    type: PRINT_ORDERS,
  };
}

export function resetState() {
  return { type: RESET_STATE };
}