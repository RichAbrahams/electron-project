import { createSelector } from 'reselect';

const selectProducts = () => (state) => state.products;

const selectData = () => createSelector(
  selectProducts(),
  (substate) => substate.testdata
);

export {
  selectData,
};
