import checkForDuplicateOrder from '../mongoOperations/checkForDuplicateOrder';
import processDownloadedOrders from './processDownloadedOrders';

export default async function (event, action, orders) {

  const exists = await Promise.all(orders.map(async(item) => {
    const checkForDuplicate = await checkForDuplicateOrder(item.orderId);
    return checkForDuplicate;
  }));

  const filteredOrders = orders.filter((item, index) => {
    return !exists[index];
  });

  processDownloadedOrders(event, action, filteredOrders);
}
