import { mongoSaveOne, mongoSaveMany, mongoRetrieveMany, mongoRetrieveDocument } from './mongoOperations';
import fetchRefreshedToked from './refreshToken';
import signInPopUp from './signIn';
import fetchUnfulfilledOrders from './fetchUnfulfilledOrders';

export async function saveConsignment(event, consignment) {
  const products = consignment.products;
  delete consignment.products;
  const ids = products.map(item => item.productID);
  try {
    const checkIds = await mongoRetrieveMany('products', 'productID', ids);
    if (checkIds.length > 0) {
      throw new Error('duplicate productID');
    }
    await mongoSaveOne('consignments', consignment);
    await mongoSaveMany('products', products);
    event.sender.send('consignmentSaveResponse', { success: true });
  } catch (err) {
    event.sender.send('consignmentSaveResponse', { error: err });
  }
}

export async function retrieveDocument(event, arg) {
  try {
    const indexes = await mongoRetrieveDocument(arg.collection, arg.index);
    event.sender.send('retrieveDocumentResponse', { success: indexes });
  } catch (err) {
    event.sender.send('retrieveDocumentResponse', { error: err });
  }
}

export async function signIn(event) {
  try {
    const authTokens = await signInPopUp();
    event.sender.send('signInResponse', authTokens);
  } catch (err) {
    event.sender.send('signInResponse', { error: err });
  }
}

export async function refreshKeys(event, arg) {
  try {
    const authToken = await fetchRefreshedToked(arg.refreshToken);
    event.sender.send('refreshKeysResponse', authToken);
  } catch (err) {
    event.sender.send('refreshKeysResponse', { error: err });
  }
}

export async function getUnfulfilledOrders(event) {
  console.log('getUnfulfilledOrdersListener');
  try {
    const orders = await fetchUnfulfilledOrders();
    console.log('getUnfulfilledOrders listner responding');
    event.sender.send('getUnfulfilledOrdersResponse', orders);
  } catch (err) {
    event.sender.send('getUnfulfilledOrdersResponse', { error: err });
  }
}

