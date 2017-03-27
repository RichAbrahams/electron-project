import { ipcRenderer } from 'electron';
import { mongoRetrieveMany, mongoSaveMany, mongoSaveOne } from '../mainProcessMethods/mainProcessActions';

export const CHECK_PACKAGE_IDS = 'handleConsignmentSubmit/CHECK_PACKAGE_IDS';
export const SAVE_CONSIGNMENT = 'handleConsignmentSubmit/SAVE_CONSIGNMENT';
export const SAVE_CONSIGNMENT_PRODUCTS = 'handleConsignmentSubmit/SAVE_CONSIGNMENT_PRODUCTS';

function packageProductIDs(data) {
  return {
    collection: 'products',
    index: 'productID',
    values: data
      .products
      .map(item => item.productID),
    from: CHECK_PACKAGE_IDS,
  };
}

function packageProducts(data) {
  return { collection: 'products', values: data.products, from: SAVE_CONSIGNMENT_PRODUCTS };
}

function packageConsignment(data) {
  const strippedObject = Object
    .keys(data)
    .reduce((previous, current) => {
      if (current !== 'products') {
        previous[current] = data[current];
      }
      return previous;
    }, {});
  return { collection: 'consignments', values: strippedObject, from: SAVE_CONSIGNMENT };
}

function checkMultipleUnique(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoRetrieveMany(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === `${CHECK_PACKAGE_IDS}_SUCCESS`) {
        console.log('checkMultipleUnique', arg.payload);
        if (arg.payload.length !== 0) {
          const ids = arg
            .payload
            .map((item) => item.productID);
          reject(ids);
        } else {
          resolve();
        }
      }
      if (arg.type === `${CHECK_PACKAGE_IDS}_ERROR`) {
        reject(arg.payload);
      }
    });
  });
}

function saveMany(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoSaveMany(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === `${SAVE_CONSIGNMENT_PRODUCTS}_SUCCESS`) {
        resolve();
      }
      if (arg.type === `${SAVE_CONSIGNMENT_PRODUCTS}_ERROR`) {
        reject(arg.payload);
      }
    });
  });
}

function saveOne(data) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('messageFromRenderer', mongoSaveOne(data));
    ipcRenderer.on('messageFromMain', (event, arg) => {
      if (arg.type === `${SAVE_CONSIGNMENT}_SUCCESS`) {
        resolve();
      }
      if (arg.type === `${SAVE_CONSIGNMENT}_ERROR`) {
        reject(arg.payload);
      }
    });
  });
}

export default function handleConsignmentSubmit(data) {
  console.log('handleConsignmentSubmit');
  return new Promise(async (resolve, reject) => {
    try {
      await checkMultipleUnique(packageProductIDs(data));
      await saveMany(packageProducts(data));
      await saveOne(packageConsignment(data));
      resolve();
    } catch (err) {
      return reject(err);
    }
  });
}
