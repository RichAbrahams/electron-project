import retrieveProduct from '../mongoOperations/retrieveProduct';
import calculateEbayFee from './calculateEbayFee';

export default async function createItemDetails(db, item, charges) {
  try {
    const container = {};
    container.sku = item.sku;
    const product = await retrieveProduct(db, item.sku);
    container.landedPackCost = product[0].packCostGBP;
    container.landedCostOfProducts = container.landedPackCost * item.quantity;
    container.title = item.title;
    container.category = product[0].category;
    container.quantity = item.quantity;
    container.lineItemId = item.lineItemId;
    if (item.deliveryCost.shippingCost) {
      const shippingCost = parseFloat(item.deliveryCost.shippingCost.convertedFromValue);
      container.deliveryCost = shippingCost.toFixed(2);
    } else {
      container.deliveryCost = '0.00';
    }
    container.itemCost = item.lineItemCost.convertedFromValue;
    container.totalCost = item.total.convertedFromValue;
    container.itemEbayFee = calculateEbayFee(container.totalCost, container.category, charges);
    return container;
  } catch (err) {
    throw (err);
  }
}
