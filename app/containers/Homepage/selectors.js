import { createSelector } from 'reselect';

const selectHomepage = () => (state) => state.homepage;

const selectData = () => createSelector(
  selectHomepage(),
  (substate) => substate.testdata
);

export {
  selectData,
};
