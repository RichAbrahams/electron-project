import { ipcRenderer } from 'electron';
import { mongoRetrieveMany } from '../mainProcessImports/mainProcessActions';
import { MONGO_RETRIEVE_MANY_SUCCESS } from '../mainProcessImports/mainProcessConstants';

export default function checkMultipleUnique(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoRetrieveMany(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === MONGO_RETRIEVE_MANY_SUCCESS) {
        if (arg.payload.length !== 0) {
          const ids = arg.payload.map((item) => item.productID);
          reject(ids);
        } else {
          resolve();
        }
      }
    });
  });
}
