import { createSelector } from 'reselect';

const selectOrders = () => (state) => state.orders;

const selectNavBar = () => (state) => state.navbar;

const selectAccessToken = () => createSelector(selectNavBar(), (substate) => substate.access_token);

export {
  selectAccessToken,
};
