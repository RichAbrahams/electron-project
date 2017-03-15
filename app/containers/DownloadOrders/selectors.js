import { createSelector } from 'reselect';

const selectOrders = () => (state) => state.orders;

const selectData = () => createSelector(
  selectOrders(),
  (substate) => substate.testdata
);

export {
  selectData,
};
