import {
  GET_NEW_ORDERS_SUCCESS,
  GET_NEW_ORDERS_ERROR,
} from './constants';

const initialState = {
  downloadingFlag: false,
  newOrders: [],
  error: false,
};

function DownloadOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_ORDERS_SUCCESS:
      {
        console.log('GET_NEW_ORDERS_SUCCESS', action.payload);
        return Object.assign({}, state, {
          newOrders: action.payload
        });
      }
    case GET_NEW_ORDERS_ERROR:
      {
        console.log('GET_NEW_ORDERS_ERROR', action.payload);
        return Object.assign({}, state, {
          error: action.payload
        });
      }
    default:
      return state;
  }
}

export default DownloadOrdersReducer;
