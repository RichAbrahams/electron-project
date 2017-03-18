import { REFRESH_TOKEN, SIGN_IN } from '../containers/NavBar/constants';
import getRefreshedToken from './refreshToken';
import signIn from './signIn';

export default function sortMessages(event, action, mainWindow) {
  console.log('sortMessages', action);
  switch (action.type) {
    case REFRESH_TOKEN:
      {
        getRefreshedToken(event, action);
        break;
      }
    case SIGN_IN:
      {
        signIn(event, action, mainWindow);
        break;
      }
    default:
      {
        break;
      }
  }
}
