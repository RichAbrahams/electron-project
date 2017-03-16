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
        console.log('NavBarReducer setting state', action.keys);
        return Object.assign({}, state, action.keys);
      }
    case COMPLETE_SIGN_IN_SUCCESS:
      {
        console.log('NavBarReducer setting state', action.keys);
        return Object.assign({}, state, action.keys, {
          accessTokenExpires: action.keys.expires_in + Date.now()
        });
      }
    case COMPLETE_SIGN_IN_ERROR:
      {
        console.log('NavBarReducer received error', action);
        return Object.assign({}, state, { signInError: action.error });
      }
    case COMPLETE_REFRESH_KEY_SUCCESS:
      {
        console.log('COMPLETE_REFRESH_KEY_SUCCESS setting state', action.keys);
        return Object.assign({}, state, action.keys, {
          accessTokenExpires: action.keys.expires_in + Date.now()
        });
      }
    case COMPLETE_REFRESH_KEY_ERROR:
      {
        console.log('COMPLETE_REFRESH_KEY_SUCCESS setting state', action.keys);
        return Object.assign({}, state, { refreshTokenError: action.error });
      }
    default:
      return state;
  }
}

export default NavBarReducer;
