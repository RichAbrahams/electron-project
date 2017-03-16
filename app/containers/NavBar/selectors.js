import { createSelector } from 'reselect';

const selectNavBar = () => (state) => state.navbar;

const selectRouting = () => (state) => state.routing.locationBeforeTransitions;

const selectRefreshToken = () => createSelector(
  selectNavBar(),
  (substate) => substate.refresh_token
);

const selectAccessToken = () => createSelector(
  selectNavBar(),
  (substate) => substate.access_token
);

const selectAccessTokenExpires = () => createSelector(
  selectNavBar(),
  (substate) => substate.accessTokenExpires
);

const selectRoute = () => createSelector(
  selectRouting(),
  (substate) => substate.pathname
);

export {
  selectRoute,
  selectRefreshToken,
  selectAccessToken,
  selectAccessTokenExpires,
};
