import storage from 'electron-json-storage';
import { INITIALIZE_CREDENTIALS } from '../containers/NavBar/constants';
import { refreshToken, signIn } from '../containers/NavBar/actions';

export default function ({ dispatch }) {
  return next => action => {
    if (action.type !== INITIALIZE_CREDENTIALS) {
      return next(action);
    }
    storage.get('keys', (error, keys) => {
      if (error || !keys.refresh_token) {
        dispatch(signIn());
      } else {
        dispatch(refreshToken(keys.refresh_token));
      }
    });
  };
}

