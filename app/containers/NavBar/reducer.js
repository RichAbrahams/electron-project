import {
  RESTORE_KEYS_TO_STATE,
  COMPLETE_SIGN_IN_SUCCESS,
  COMPLETE_SIGN_IN_ERROR,
  COMPLETE_REFRESH_KEY_SUCCESS,
  COMPLETE_REFRESH_KEY_ERROR
} from './constants';

const initialState = {
  accessTokenExpires: null,
  signInError: false,
  refreshTokenError: false
};

function NavBarReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORE_KEYS_TO_STATE:
      {
        console.log('RESTORE_KEYS_TO_STATE:', action.payload);
        return Object.assign({}, state, action.payload);
      }
    case COMPLETE_SIGN_IN_SUCCESS:
      {
        console.log('COMPLETE_SIGN_IN_SUCCESS:', action.payload);
        return Object.assign({}, state, action.payload, {
          accessTokenExpires: action.payload.expires_in + Date.now()
        });
      }
    case COMPLETE_SIGN_IN_ERROR:
      {
        return Object.assign({}, state, { signInError: action.payload.error });
      }
    case COMPLETE_REFRESH_KEY_SUCCESS:
      {
        return Object.assign({}, state, action.payload, {
          accessTokenExpires: action.payload.expires_in + Date.now()
        });
      }
    case COMPLETE_REFRESH_KEY_ERROR:
      {
        return Object.assign({}, state, { refreshTokenError: action.payload.error });
      }
    default:
      return state;
  }
}

export default NavBarReducer;
