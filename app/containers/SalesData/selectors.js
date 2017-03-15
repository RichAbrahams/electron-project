import { createSelector } from 'reselect';

const selectSalesData = () => (state) => state.salesdata;

const selectData = () => createSelector(
  selectSalesData(),
  (substate) => substate.testdata
);

export {
  selectData,
};
