import {
  GET_NEW_ORDERS,
  GET_NEW_ORDERS_SUCCESS,
  GET_NEW_ORDERS_ERROR,
  SET_EDIT_INDEX,
  RESET_EDIT_INDEX,
  EDIT_ORDER,
  SAVE_NEW_ORDERS,
  SAVE_NEW_ORDERS_SUCCESS,
  SAVE_NEW_ORDERS_ERROR,
  RESET_STATE
} from './constants';

const initialState = {
  newOrders: null,
  error: false,
  editIndex: null,
  phase: 'start',
  message: 'Click to download new orders'
};

function DownloadOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NEW_ORDERS:
      {
        return Object.assign({}, state, {
          phase: 'wait',
          message: null
        });
      }
    case GET_NEW_ORDERS_SUCCESS:
      {
        console.log('GET_NEW_ORDERS_SUCCESS', action.payload);
        if (action.payload.length > 0) {
          return Object.assign({}, state, {
            newOrders: action.payload,
            phase: 'save',
            message: `${action.payload.length} orders retrieved`
          });
        }
        return Object.assign({}, state, {
          newOrders: null,
          phase: 'finished',
          message: 'No new orders were retrieved'
        });
      }
    case GET_NEW_ORDERS_ERROR:
      {
        console.log('GET_NEW_ORDERS_ERROR', action.payload);
        return Object.assign({}, state, {
          error: action.payload,
          phase: 'error',
          message: 'An error occured retrieving orders'
        });
      }
    case SET_EDIT_INDEX:
      {
        console.log('SET_EDIT_INDEX', action.payload);
        return Object.assign({}, state, {
          editIndex: action.payload + 1,
          phase: 'edit',
          message: 'Edit order'
        });
      }
    case RESET_EDIT_INDEX:
      {
        console.log('RESET_EDIT_INDEX', action.payload);
        return Object.assign({}, state, {
          editIndex: null,
          phase: 'save',
          message: 'Edit cancelled'
        });
      }
    case EDIT_ORDER:
      {
        console.log('EDIT_ORDER', action.payload);
        const oldState = Object.assign({}, state);
        const editedOrders = oldState.newOrders;
        editedOrders.splice(state.editIndex - 1, 1, action.payload);
        return Object.assign({}, state, {
          newOrders: editedOrders,
          editIndex: null,
          phase: 'save',
          message: 'Edit complete'
        });
      }
    case SAVE_NEW_ORDERS:
      {
        console.log('SAVE_NEW_ORDERS', action.payload);
        return Object.assign({}, state, {phase: 'wait'});
      }
    case SAVE_NEW_ORDERS_SUCCESS:
      {
        console.log('SAVE_NEW_ORDERS_SUCCESS', action.payload);
        return Object.assign({}, state, {
          phase: 'finished',
          message: 'Orders saved'
        });
      }
    case SAVE_NEW_ORDERS_ERROR:
      {
        console.log('SAVE_NEW_ORDERS_ERROR', action.payload);
        return Object.assign({}, state, {
          phase: 'error',
          message: 'An error occured when saving orders'
        });
      }

    case RESET_STATE:
      {
        console.log('RESET_STATE', action.payload);
        return Object.assign({}, state, {
          newOrders: null,
          error: false,
          editIndex: null,
          phase: 'start',
          message: 'Click to download new orders'
        });
      }
    default:
      return state;
  }
}

export default DownloadOrdersReducer;
