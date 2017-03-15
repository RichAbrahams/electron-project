import {
  NEXT_FORM,
  PREVIOUS_FORM,
  SET_PAGE_TO_ONE,
} from './constants';

const initialState = {
  formPageNumber: 1,
  consignment: {},
};

// consignment: {
//     consignmentID: 'EV916903303CN',
//     weight: 20.49,
//     usdTotal: 483.71,
//     gbpTotal: 418.48,
//     productsTotal: 299.38,
//     shipping: 163.94,
//     agentService: 19.16,
//     chnCustoms: 1.23,
//     ukDuty: 12.47,
//     ukVat: 115.87,
//     ukClearance: 13.5,
//   },

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
    default:
      return state;
  }
}

export default ConsignmentsReducer;
