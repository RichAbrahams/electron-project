import {
  THUNK_UPDATE,
} from './constants';

const initialState = {
  testdata: 'HomepageReducer',
};

function HomepageReducer(state = initialState, action) {
  switch (action.type) {
    case THUNK_UPDATE:
      return Object.assign({}, state, { testdata: action.data });
    default:
      return state;
  }
}

export default HomepageReducer;
