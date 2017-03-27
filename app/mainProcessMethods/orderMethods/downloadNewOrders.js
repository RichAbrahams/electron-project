import fetcher from '../fetcher';
import replyToRenderer from '../replyToRenderer';
import { urls } from '../../../keys';
import processDownloadedOrders from './processDownloadedOrders';

function createOptions(authcode) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authcode}`
    }
  };
}

export default async function downloadNewOrders(event, action) {
  try {
    const response = await fetcher(urls.getUnfullfilled, createOptions(action.payload));
    console.log('response', response);
    if (response.orders.length) {
      processDownloadedOrders(event, action, response.orders);
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
