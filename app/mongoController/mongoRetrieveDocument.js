import { ipcRenderer } from 'electron';

export default function mongoRetrieveDocument(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('retrieveDocument', data);
    ipcRenderer.on('retrieveDocumentResponse', (event, arg) => {
      if (arg.success) {
        console.log('retrieveDocumentResponse', arg);
        return resolve(arg);
      }
      console.log('retrieveDocumentError', arg);
      return reject(arg);
    });
  });
}
