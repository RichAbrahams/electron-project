import fetcher from './fetcher';
import {mongoSaveMany} from './mongoOperations';
import replyToRenderer from './replyToRenderer';

function repackOrders(orders) {
  return orders.map((item) => Object.assign({}, item, {
    printed: false,
    picked: false,
    dispatched: false
  }));
}

function createOptions(authcode) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authcode}`
    }
  };
}

function buildSaveObject(action, repackedOrders) {
  return Object.assign({}, action, {
    payload: {
      from: action.type,
      collection: 'orders',
      values: repackedOrders
    }
  });
}

const ordersUrl = 'https://api.sandbox.ebay.com/sell/fulfillment/v1/order?filter='
// + 'creationdate:%5B2017-03-01T08:25:43.511Z..2017-03-20T08:25:43.511Z%5D&'
+
  'orderfulfillmentstatus:%7BNOT_STARTED%7CIN_PROGRESS%7D&limit=1000&offset=0';

export default async function getNewOrders(event, action) {
  try {
    const response = await fetcher(ordersUrl, createOptions(action.payload));
    if (response.orders.length) {
      const repackedOrders = repackOrders(response.orders);
      const toSave = buildSaveObject(action, repackedOrders);
      mongoSaveMany(event, toSave);
    } else {
      replyToRenderer(event, {
        type: `${action.type}_SUCCESS`,
        payload: []
      });
    }
  } catch (err) {
    replyToRenderer(event, {
      type: `${action.type}_ERROR`,
      payload: err
    });
  }
}
