import {
  GET_NEW_ORDERS_SUCCESS,
  GET_NEW_ORDERS_ERROR,
  SET_EDIT_INDEX,
  RESET_EDIT_INDEX,
} from './constants';

const initialState = {
  downloadingFlag: false,
  newOrders: [],
  error: false,
  editIndex: null,
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
    case SET_EDIT_INDEX:
      {
        console.log('SET_EDIT_INDEX', action.payload);
        return Object.assign({}, state, {
          editIndex: action.payload + 1
        });
      }
    case RESET_EDIT_INDEX:
      {
        console.log('RESET_EDIT_INDEX', action.payload);
        return Object.assign({}, state, {
          editIndex: null
        });
      }
    default:
      return state;
  }
}

export default DownloadOrdersReducer;
