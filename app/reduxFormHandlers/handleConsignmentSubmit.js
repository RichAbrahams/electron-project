import checkMultipleUnique from './checkMultipleUnique';
import saveMany from './saveMany';
import saveOne from './saveOne';

export default function handleConsignmentSubmit(data) {
  console.log('handleConsignmentSubmit');
  return new Promise(async function (resolve, reject) {
    try {
      await checkMultipleUnique({
        collection: 'products',
        index: 'productID',
        values: data
          .products
          .map(item => item.productID)
      });
    } catch (err) {
      return reject(err);
    }
    try {
      const products = {
        collection: 'products',
        values: data.products
      };
      await saveMany(products);
    } catch (err) {
      return reject(err);
    }
    try {
      const strippedObject = Object
        .keys(data)
        .reduce((previous, current) => {
          if (current !== 'products') {
            previous[current] = data[current];
          }
          return previous;
        }, {});
      const consignment = {
        collection: 'consignments',
        values: strippedObject
      };
      await saveOne(consignment);
    } catch (err) {
      return reject(err);
    }
    resolve();
  });
}
