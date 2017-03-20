import { ipcRenderer } from 'electron';
import { mongoRetrieveOne } from '../mainProcessImports/mainProcessActions';
import { MONGO_RETRIEVE_ONE_SUCCESS } from '../mainProcessImports/mainProcessConstants';

export default function asyncValidate(data) {
  return new Promise((resolve, reject) => {
    const toCheck = {
      collection: 'consignments',
      index: 'consignmentID',
      value: data.consignmentID
    };
    ipcRenderer.send('messageFromRenderer', mongoRetrieveOne(toCheck));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === MONGO_RETRIEVE_ONE_SUCCESS) {
        if (arg.payload.length !== 0) {
          reject('ConsignmentID already in use');
        } else {
          resolve();
        }
      }
    });
  })
    .then(res => res)
    .catch(err => ({ consignmentID: err }));
}
