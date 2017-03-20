import { REFRESH_TOKEN, SIGN_IN } from '../containers/NavBar/constants';
import { GET_NEW_ORDERS } from '../containers/DownloadOrders/constants';
import { MONGO_RETRIEVE_ONE, MONGO_RETRIEVE_MANY, MONGO_SAVE_MANY, MONGO_SAVE_ONE } from '../mainProcessImports/mainProcessConstants';
import { mongoRetrieveOne, mongoRetrieveMany, mongoSaveMany, mongoSaveOne } from './mongoOperations';
import getRefreshedToken from './refreshToken';
import signIn from './signIn';
import getNewOrders from './getNewOrders';

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
    case MONGO_RETRIEVE_ONE:
      {
        mongoRetrieveOne(event, action);
        break;
      }
    case MONGO_RETRIEVE_MANY:
      {
        mongoRetrieveMany(event, action);
        break;
      }
    case MONGO_SAVE_MANY:
      {
        mongoSaveMany(event, action);
        break;
      }
    case MONGO_SAVE_ONE:
      {
        mongoSaveOne(event, action);
        break;
      }
    case GET_NEW_ORDERS:
      {
        getNewOrders(event, action);
        break;
      }
    default:
      {
        break;
      }
  }
}
