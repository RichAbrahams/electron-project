import replyToRenderer from './replyToRenderer';
import calculateOrder from './calculateOrder';

export default async function processNewOrders(event, action, orders) {
  console.log('process new order');
  try {
    const processedOrders = await Promise.all(orders.map(async(item) => {
      const order = await calculateOrder(item);
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
