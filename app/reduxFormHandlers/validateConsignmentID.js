import { ipcRenderer } from 'electron';
import { mongoRetrieveOne } from '../mainProcessMethods/mainProcessActions';

const VALIDATE_CONSIGNMENT_ID = 'reduxFormHandlers/validateConsignmentID';

export default function asyncValidate(data) {
  return new Promise((resolve, reject) => {
    const toCheck = {
      collection: 'consignments',
      index: 'consignmentID',
      value: data.consignmentID,
      from: VALIDATE_CONSIGNMENT_ID,
    };

    ipcRenderer.send('messageFromRenderer', mongoRetrieveOne(toCheck));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === `${VALIDATE_CONSIGNMENT_ID}_SUCCESS`) {
        if (arg.payload.length !== 0) {
          reject('ConsignmentID already in use');
        } else {
          resolve();
        }
      }
      if (arg.type === `${VALIDATE_CONSIGNMENT_ID}_ERROR`) {
        reject(arg.payload);
      }
    });
  })
    .then(res => res)
    .catch(err => ({ consignmentID: err }));
}
