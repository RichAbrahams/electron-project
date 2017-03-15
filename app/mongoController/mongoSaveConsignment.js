import { ipcRenderer } from 'electron';

export default function mongoSaveConsignment(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('saveConsignment', data);
    ipcRenderer.on('consignmentSaveResponse', (event, arg) => {
      if (arg.success) {
        return resolve();
      }
      return reject();
    });
  });
}
