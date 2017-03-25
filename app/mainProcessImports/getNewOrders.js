import fetcher from './fetcher';
import replyToRenderer from './replyToRenderer';
import {urls} from '../../keys';
import processNewOrders from './processNewOrders';

function createOptions(authcode) {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authcode}`
    }
  };
}

export default async function getNewOrders(event, action) {
  try {
    const response = await fetcher(urls.getUnfullfilled, createOptions(action.payload));
    console.log('response', response);
    if (response.orders.length) {
      processNewOrders(event, action, response.orders);
      // const processedOrders = await Promise.all(response.orders.map(async(item) => {
      //   const order = await calculateOrder(item);
      //   return order;
      // }));
      // mongoSaveMany(event, {
      //   type: action.type,
      //   payload: {
      //     collection: 'orders',
      //     values: processedOrders,
      //     from: action.type
      //   }
      // });
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
