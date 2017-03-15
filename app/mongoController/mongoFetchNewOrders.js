import { ipcRenderer } from 'electron';

export default function mongoFetchNewOrders(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('fetchNewOrders', data);
    ipcRenderer.on('fetchNewOrdersResponse', (event, arg) => {
      if (arg.success) {
        return resolve(arg.orders);
      }
      console.log(arg);
      return reject();
    });
  });
}
