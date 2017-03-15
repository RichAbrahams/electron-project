import { createSelector } from 'reselect';

const selectNavBar = () => (state) => state.navbar;

const selectRouting = () => (state) => state.routing.locationBeforeTransitions;

const selectRefreshToken = () => createSelector(
  selectNavBar(),
  (substate) => substate.refreshToken
);

const selectRefreshTokenExpires = () => createSelector(
  selectNavBar(),
  (substate) => substate.refreshTokenExpires
);

const selectAccessToken = () => createSelector(
  selectNavBar(),
  (substate) => substate.accessToken
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
  selectRefreshTokenExpires,
  selectAccessToken,
  selectAccessTokenExpires,
};
