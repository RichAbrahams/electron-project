import {
  GET_UNPRINTED_ORDERS,
  GET_UNPRINTED_ORDERS_SUCCESS,
  GET_UNPRINTED_ORDERS_ERROR,
  PRINT_ORDERS,
  PRINT_ORDERS_SUCCESS,
  PRINT_ORDERS_ERROR,
  RESET_STATE
} from './constants';

const initialState = {
  orders: null,
  error: false,
  phase: 'start',
  message: 'Click to retrieve unprinted orders'
};

function PrintOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_UNPRINTED_ORDERS:
      return Object.assign({}, state, {
        phase: 'wait',
        message: null
      });
    case GET_UNPRINTED_ORDERS_SUCCESS:
      {
        console.log('GET_UNPRINTED_ORDERS_SUCCESS:', action.payload);
        return Object.assign({}, state, {
          orders: action.payload,
          phase: 'print',
          message: 'Unprinted Orders Retrieved'
        });
      }
    case GET_UNPRINTED_ORDERS_ERROR:
      {
        return Object.assign({}, state, {
          error: action.payload,
          phase: 'error',
          message: 'An error occured whilst retrieving orders'
        });
      }
    case PRINT_ORDERS:
      {
        return Object.assign({}, state, {
          error: action.payload,
          phase: 'wait'
        });
      }
    case PRINT_ORDERS_SUCCESS:
      {
        return Object.assign({}, state, {
          error: action.payload,
          phase: 'finished',
          message: 'Invoices Printed'
        });
      }
    case PRINT_ORDERS_ERROR:
      {
        return Object.assign({}, state, {
          error: action.payload,
          phase: 'error',
          message: 'An error occured whilst printing orders'
        });
      }
    case RESET_STATE:
      {
        return Object.assign({}, state, {
          orders: null,
          error: false,
          phase: 'start',
          message: 'Click to download new orders'
        });
      }
    default:
      return state;
  }
}

export default PrintOrdersReducer;
