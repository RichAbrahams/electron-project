import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
} from './constants';

const initialState = {
  accessTokenExpires: null,
  signInError: false,
  refreshTokenError: false
};

function NavBarReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      {
        console.log('COMPLETE_SIGN_IN_SUCCESS:', action.payload);
        return Object.assign({}, state, action.payload, {
          accessTokenExpires: action.payload.expires_in + Date.now()
        });
      }
    case SIGN_IN_ERROR:
      {
        return Object.assign({}, state, { signInError: action.payload.error });
      }
    case REFRESH_TOKEN_SUCCESS:
      {
        console.log('REFRESH_TOKEN_SUCCESS', action.payload);
        return Object.assign({}, state, action.payload, {
          accessTokenExpires: action.payload.expires_in + Date.now()
        });
      }
    case REFRESH_TOKEN_ERROR:
      {
        console.log('REFRESH_TOKEN_ERROR', action.payload);
        return state;
      }
    default:
      return state;
  }
}

export default NavBarReducer;
