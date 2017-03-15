import {
  SIGN_IN_SUCCESS,
} from './constants';

const initialState = {
  refreshToken: null,
  refreshTokenExpires: null,
  accessToken: null,
  accessTokenExpires: null,
};

function NavBarReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS: {
      console.log(action);
      return Object.assign({}, state, {
        accessToken: action.data.access_token,
        accessTokenExpires: Date.now() + action.data.expires_in,
        refreshToken: action.data.refresh_token,
        refreshTokenExpires: Date.now() + action.data.refresh_token_expires_in,
      });
    }
    default:
      return state;
  }
}

export default NavBarReducer;
