import fetcher from '../fetcher';
import replyToRenderer from '../replyToRenderer';
import { urls } from '../../../keys';
import removeDuplicateOrders from './removeDuplicateOrders';

function createOptions(authcode) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authcode}`
    }
  };
}

export default async function downloadNewOrders(db, event, action) {
  try {
    const response = await fetcher(urls.getUnfullfilled, createOptions(action.payload));
    console.log('received orders');
    if (response.orders.length) {
      removeDuplicateOrders(db, event, action, response.orders);
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
