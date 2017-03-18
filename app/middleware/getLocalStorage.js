import storage from 'electron-json-storage';
import { INITIALIZE_CREDENTIALS } from '../containers/NavBar/constants';
import { refreshToken, signIn } from '../containers/NavBar/actions';

export default function ({ dispatch }) {
  console.log('getLocalStorage');
  return next => action => {
    if (action.type !== INITIALIZE_CREDENTIALS) {
      return next(action);
    }
    storage.get('keys', (error, keys) => {
      console.log('check if rt', keys.refresh_token);
      if (error || !keys.refresh_token) {
        console.log('dispatch(signIn());');
        dispatch(signIn());
      } else {
        console.log('dispatch(refreshKeys(parsedKeys.refresh_token));');
        dispatch(refreshToken(keys.refresh_token));
      }
    });
  };
}

