import {createSelector} from 'reselect';

const selectOrders = () => (state) => state.downloadOrders;

const selectNavBar = () => (state) => state.navbar;

const selectAccessToken = () => createSelector(selectNavBar(), (substate) => substate.access_token);

const selectNewOrders = () => createSelector(selectOrders(), (substate) => substate.newOrders);

const selectEditIndex = () => createSelector(selectOrders(), (substate) => substate.editIndex);

const selectShowButton = () => createSelector(selectOrders(), (substate) => substate.showButton);

const selectMessage = () => createSelector(selectOrders(), (substate) => substate.message);

const selectEditOrder = () => createSelector(selectNewOrders(), selectEditIndex(), (substate, index) => {
  if (index) {
    return substate[index - 1];
  } else {
    return null;
  }
});

const selectDownloading = () => createSelector(selectOrders(), (substate) => substate.downloading);

export {
  selectAccessToken,
  selectNewOrders,
  selectEditIndex,
  selectEditOrder,
  selectDownloading,
  selectShowButton,
  selectMessage
};
