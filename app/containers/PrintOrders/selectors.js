import { createSelector } from 'reselect';

const selectPrintOrders = () => (state) => state.printOrders;

const selectPhase = () => createSelector(
  selectPrintOrders(),
  (substate) => substate.phase
);

const selectOrders = () => createSelector(
  selectPrintOrders(),
  (substate) => substate.orders
);

const selectMessage = () => createSelector(
  selectPrintOrders(),
  (substate) => substate.message
);


export {
  selectPhase,
  selectOrders,
  selectMessage,
};
