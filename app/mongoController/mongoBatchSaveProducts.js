import { ipcRenderer } from 'electron';

export default function mongoBatchSaveProducts(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('batchSaveProducts', data);
    ipcRenderer.on('batchSaveProductsResponse', (event, arg) => {
      if (arg.success) {
        return resolve();
      }
      console.log(arg);
      return reject();
    });
  });
}
