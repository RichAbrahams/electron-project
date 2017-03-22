import fetcher from './fetcher';
import {mongoSaveMany} from './mongoOperations';
import replyToRenderer from './replyToRenderer';
import { urls } from '../../keys';
import processNewOrders from './processNewOrders';

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

export default async function getNewOrders(event, action) {
  try {
    const response = await fetcher(urls.getUnfullfilled, createOptions(action.payload));
    if (response.orders.length) {
      replyToRenderer(event, {
        type: `${action.type}_SUCCESS`,
        payload: response.orders
      });
    } else {
      replyToRenderer(event, {
        type: `${action.type}_SUCCESS`,
        payload: []
      });
    }
  } catch (err) {
    console.log(err);
    replyToRenderer(event, {
      type: `${action.type}_ERROR`,
      payload: err
    });
  }
}
