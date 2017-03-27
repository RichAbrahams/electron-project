import {} from './constants';

const initialState = {
  testdata: 'OrdersReducer'
};

function OrdersReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default OrdersReducer;
