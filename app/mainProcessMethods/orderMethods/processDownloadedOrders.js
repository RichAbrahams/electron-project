import replyToRenderer from '../replyToRenderer';
import constructOrderObject from './constructOrderObject';

export default async function ProcessDownloadedOrders(db, event, action, orders) {
  try {
    const processedOrders = await Promise.all(orders.map(async (item) => {
      const order = await constructOrderObject(db, item);
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
