import checkForDuplicateOrder from '../mongoOperations/checkForDuplicateOrder';
import processDownloadedOrders from './processDownloadedOrders';
import replyToRenderer from '../replyToRenderer';

export default async function (db, event, action, orders) {
  try {
    const exists = await Promise.all(orders.map(async(item) => {
      const checkForDuplicate = await checkForDuplicateOrder(db, item.orderId);
      return checkForDuplicate;
    }));
    const filteredOrders = orders.filter((item, index) => {
      return !exists[index];
    });
    processDownloadedOrders(db, event, action, filteredOrders);
  } catch (err) {
    replyToRenderer(event, {
      type: `${action.type}_ERROR`,
      payload: err
    });
  }
}
