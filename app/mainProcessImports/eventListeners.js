import { mongoSaveOne, mongoSaveMany, mongoRetrieveMany, mongoRetrieveDocument } from './mongoOperations';
import { ebaySignInPopUp, refreshToken } from './ebayAuthOperations';

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

export async function fetchNewOrders(event, arg) {
  try {
    const indexes = await mongoRetrieveDocument(arg.collection, arg.index);
    event.sender.send('fetchNewOrdersResponse', { success: indexes });
  } catch (err) {
    event.sender.send('fetchNewOrdersResponse', { error: err });
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

export async function ebaySignIn(event) {
  try {
    const authTokens = await ebaySignInPopUp();
    console.log('ebaySignIn', authTokens);
    event.sender.send('ebaySignInResponse', authTokens);
  } catch (err) {
    console.log('ebaySignIn catch', err);
    event.sender.send('ebaySignInResponse', err);
  }
}

export async function ebayRefreshKeys(event, arg) {
  console.log('ebayRefreshKeys arg', arg);
  try {
    const authToken = await refreshToken(arg.refreshToken);
    console.log('success', authToken);
    event.sender.send('ebayRefreshKeysResponse', authToken);
  } catch (err) {
    console.log('failed', err);
    event.sender.send('ebayRefreshKeysResponse', err);
  }
}

