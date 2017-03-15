import {
  TOGGLE_DOWNLOADING_FLAG,
} from './constants';

const initialState = {
  downloadingFlag: false,
  newOrders: [],
};

function DownloadOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DOWNLOADING_FLAG: {
      return Object.assign({}, state, { downloadingFlag: !state.downloadingFlag });
    }
    default:
      return state;
  }
}

export default DownloadOrdersReducer;
