import { createSelector } from 'reselect';

const selectAddConsignments = () => (state) => state.addConsignment;

const selectForm = () => (state) => state.form;

const selectConsignment = () => createSelector(
  selectAddConsignments(),
  (substate) => substate.consignment
);

const selectFormPageNumber = () => createSelector(
  selectAddConsignments(),
  (substate) => substate.formPageNumber
);

const selectCategories = () => createSelector(
  selectAddConsignments(),
  (substate) => {
    const categories = substate.categories;
    if (categories) {
      return Object.keys(categories);
    }
    return null;
  }
);

const selectConsignmentForm = () => createSelector(
  selectForm(),
  (substate) => substate
);

export {
  selectFormPageNumber,
  selectConsignment,
  selectConsignmentForm,
  selectCategories,
};
