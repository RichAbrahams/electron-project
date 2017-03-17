import {COMPLETE_UNFULFILLED_ORDERS_SUCCESS, COMPLETE_UNFULFILLED_ORDERS_ERROR} from './constants';

const initialState = {
  testdata: 'OrdersReducer'
};

function OrdersReducer(state = initialState, action) {
  switch (action.type) {
    case COMPLETE_UNFULFILLED_ORDERS_SUCCESS:
      {
        console.log('COMPLETE_UNFULFILLED_ORDERS_SUCCESS:', action.payload);
        return Object.assign({}, state, action.payload);
      }
    case COMPLETE_UNFULFILLED_ORDERS_ERROR:
      {
        console.log('COMPLETE_UNFULFILLED_ORDERS_ERROR:', action.payload);
        return Object.assign({}, state, action.payload);
      }

    default:
      return state;
  }
}

export default OrdersReducer;
