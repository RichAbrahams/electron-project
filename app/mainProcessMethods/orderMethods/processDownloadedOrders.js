import replyToRenderer from '../replyToRenderer';
import constructOrderObject from './constructOrderObject';

export default async function ProcessDownloadedOrders(event, action, orders) {
  console.log('process new order. Number of orders:', orders.length);
  try {
    const processedOrders = await Promise.all(orders.map(async (item) => {
      const order = await constructOrderObject(item);
      return order;
    }));
    replyToRenderer(event, {
      type: `${action.type}_SUCCESS`,
      payload: processedOrders
    });
  } catch (err) {
    console.log('err at processNewOrders', err);
    replyToRenderer(event, {
      type: `${action.type}_ERROR`,
      payload: err
    });
  }
}
