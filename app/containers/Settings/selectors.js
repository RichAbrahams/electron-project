import { createSelector } from 'reselect';

const selectSettings = () => (state) => state.settings;

const selectData = () => createSelector(
  selectSettings(),
  (substate) => substate.testdata
);

export {
  selectData,
};
