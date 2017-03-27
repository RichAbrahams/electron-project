import { ipcRenderer } from 'electron';
import { mongoSaveOne } from '../mainProcessImports/mainProcessActions';
import { MONGO_SAVE_ONE_SUCCESS } from '../mainProcessMethods/mainProcessConstants';

export default function checkMultipleUnique(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoSaveOne(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === MONGO_SAVE_ONE_SUCCESS) {
        resolve();
      }
    });
  });
}
