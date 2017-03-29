import { REFRESH_TOKEN, SIGN_IN } from '../containers/NavBar/constants';
import { GET_NEW_ORDERS, SAVE_NEW_ORDERS } from '../containers/DownloadOrders/constants';
import { GET_CATEGORIES } from '../containers/AddConsignment/constants';
import { GET_UNPRINTED_ORDERS, PRINT_ORDERS } from '../containers/PrintOrders/constants';
import { MONGO_RETRIEVE_ONE, MONGO_RETRIEVE_MANY, MONGO_SAVE_MANY, MONGO_SAVE_ONE } from '../mainProcessMethods/mainProcessConstants';
import retrieveOne from './mongoOperations/retrieveOne';
import retrieveMany from './mongoOperations/retrieveMany';
import saveMany from './mongoOperations/saveMany';
import saveOne from './mongoOperations/saveOne';
import retrieveAll from './mongoOperations/retrieveAll';
import retrieveUnprintedOrders from './mongoOperations/retrieveUnprintedOrders';
import getRefreshedToken from './authMethods/refreshToken';
import signIn from './authMethods/signIn';
import downloadNewOrders from './orderMethods/downloadNewOrders';
import processEditedNewOrders from './orderMethods/processEditedNewOrders';
import printOrders from './orderMethods/printOrders';

export default function sortMessages(db, event, action, mainWindow) {
  console.log('sortMessages', action.type);
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
        retrieveOne(db, event, action);
        break;
      }
    case MONGO_RETRIEVE_MANY:
      {
        retrieveMany(db, event, action);
        break;
      }
    case MONGO_SAVE_MANY:
      {
        saveMany(db, event, action);
        break;
      }
    case MONGO_SAVE_ONE:
      {
        saveOne(db, event, action);
        break;
      }
    case GET_NEW_ORDERS:
      {
        downloadNewOrders(db, event, action);
        break;
      }
    case GET_CATEGORIES:
      {
        retrieveAll(db, event, action);
        break;
      }
    case SAVE_NEW_ORDERS:
      {
        processEditedNewOrders(db, event, action);
        break;
      }
    case GET_UNPRINTED_ORDERS:
      {
        retrieveUnprintedOrders(db, event, action);
        break;
      }
    case PRINT_ORDERS:
      {
        printOrders(event, action, mainWindow);
        break;
      }
    default:
      {
        break;
      }
  }
}
