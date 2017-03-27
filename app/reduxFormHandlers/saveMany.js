import { ipcRenderer } from 'electron';
import { mongoSaveMany } from '../mainProcessImports/mainProcessActions';
import { MONGO_SAVE_MANY_SUCCESS } from '../mainProcessMethods/mainProcessConstants';

export default function checkMultipleUnique(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoSaveMany(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === MONGO_SAVE_MANY_SUCCESS) {
        resolve();
      }
    });
  });
}
