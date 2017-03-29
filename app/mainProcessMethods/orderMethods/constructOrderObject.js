import retrieveCharges from '../mongoOperations/retrieveCharges';
import createAddress from './createAddress';
import createItemDetails from './createItemDetails';
import createPaymentDetails from './createPaymentDetails';
import calculatePaypalFee from './calculatePaypalFee';
import calculateFulfillmentCost from './calculateFulfillmentCost';
import calculateProfit from './calculateProfit';

export default async function (db, order) {
  try {
    const retriveCharges = await retrieveCharges(db);
    const charges = retriveCharges[0];
    const address = order
      .fulfillmentStartInstructions
      .map((item) => createAddress(item));
    const items = await Promise.all(order.lineItems.map(async(item) => {
      const itemDetails = await createItemDetails(db, item, charges);
      return itemDetails;
    }));
    const total = order.pricingSummary.total.convertedFromValue;
    const username = order.buyer.username;
    const creationDate = order.creationDate;
    const orderId = order.orderId;
    const paymentDetails = createPaymentDetails(order);
    const paypalFee = calculatePaypalFee(total, charges);
    const postage = charges.standardPostage;
    const packaging = charges.standardPacking;
    const ebayFee = items.reduce((acc, item) => acc + item.itemEbayFee, 0);
    const totalLandedItemsCost = (items.reduce((acc, item) => acc + item.landedCostOfProducts, 0)).toFixed(2);
    const fulfillmentCost = calculateFulfillmentCost(ebayFee, paypalFee, totalLandedItemsCost, postage, packaging);
    const profit = calculateProfit(total, fulfillmentCost);
    const output = {
      address,
      total,
      username,
      creationDate,
      orderId,
      paymentDetails,
      paypalFee,
      ebayFee,
      items,
      fulfillmentCost,
      totalLandedItemsCost,
      profit,
      printed: false,
      picked: false,
      dispatched: false,
      postage,
      packaging
    };
    return output;
  } catch (err) {
    throw(err);
  }
}
