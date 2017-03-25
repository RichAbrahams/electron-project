import {
  NEXT_FORM,
  PREVIOUS_FORM,
  SET_PAGE_TO_ONE,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
} from './constants';

const initialState = {
  formPageNumber: 1,
  consignment: {},
  categories: null,
};

function ConsignmentsReducer(state = initialState, action) {
  switch (action.type) {
    case NEXT_FORM: {
      const next = state.formPageNumber + 1;
      return Object.assign({}, state, { formPageNumber: next });
    }
    case PREVIOUS_FORM: {
      const next = state.formPageNumber - 1;
      return Object.assign({}, state, { formPageNumber: next });
    }
    case SET_PAGE_TO_ONE: {
      return Object.assign({}, state, { formPageNumber: 1 });
    }
    case GET_CATEGORIES_SUCCESS: {
      console.log('GET_CATEGORIES_SUCCESS', action);
      return Object.assign({}, state, { categories: action.payload[0].categories });
    }
    case GET_CATEGORIES_ERROR: {
      console.log('GET_CATEGORIES_ERROR', action);
      return Object.assign({}, state, { categories: action.payload });
    }
    default:
      return state;
  }
}

export default ConsignmentsReducer;
