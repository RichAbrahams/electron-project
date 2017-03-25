import math from 'mathjs';
import {mongoRetrieveCharges, mongoRetrieveProduct} from './mongoOperations';

function createAddress(order) {
  const container = {};
  if (order.shippingStep.shipTo.fullName) {
    container.fullName = order.shippingStep.shipTo.fullName;
  }
  if (order.shippingStep.shipTo.primaryPhone.phoneNumber) {
    container.phoneNumber = order.shippingStep.shipTo.primaryPhone.phoneNumber;
  }
  if (order.shippingStep.shipTo.contactAddress.addressLine1) {
    container.addressLine1 = order.shippingStep.shipTo.contactAddress.addressLine1;
  }
  if (order.shippingStep.shipTo.contactAddress.addressLine2) {
    container.addressLine2 = order.shippingStep.shipTo.contactAddress.addressLine2;
  }
  if (order.shippingStep.shipTo.contactAddress.city) {
    container.city = order.shippingStep.shipTo.contactAddress.city;
  }
  if (order.shippingStep.shipTo.contactAddress.county) {
    container.county = order.shippingStep.shipTo.contactAddress.county;
  }
  if (order.shippingStep.shipTo.contactAddress.stateOrProvince) {
    container.stateOrProvince = order.shippingStep.shipTo.contactAddress.stateOrProvince;
  }
  if (order.shippingStep.shipTo.contactAddress.postalCode) {
    container.postalCode = order.shippingStep.shipTo.contactAddress.postalCode;
  }
  if (order.shippingStep.shipTo.contactAddress.countryCode) {
    container.countryCode = order.shippingStep.shipTo.contactAddress.countryCode;
  }
  return container;
}

async function createItemDetails(item, charges) {
  try {
    const container = {};
    container.sku = item.sku;
    const product = await mongoRetrieveProduct(item.sku);
    container.landedPackCost = product[0].packCostGBP;
    container.landedCostOfProducts = container.landedPackCost * item.quantity;
    container.title = item.title;
    container.category = product[0].category;
    container.quantity = item.quantity;
    container.lineItemId = item.lineItemId;
    if (item.deliveryCost.shippingCost) {
      container.deliveryCost = item.deliveryCost.shippingCost.convertedFromValue;
    } else {
      container.deliveryCost = 0;
    }
    container.itemCost = item.lineItemCost.convertedFromValue;
    container.totalCost = item.total.convertedFromValue;
    container.itemEbayFee = calculateEbayFee(container.totalCost, container.category, charges);
    return container;
  } catch (err) {
    throw(err);
  }
}

function createPaymentDetails(order) {
  const container = order
    .paymentSummary
    .payments
    .map((item) => {
      return {paymentDate: item.paymentDate, paymentMethod: item.paymentMethod, paymentStatus: item.paymentStatus};
    });
  return container;
}

function calculatePaypalFee(total, charges) {
  const fixedFee = charges.paypalFixed;
  const percentageFee = math
    .chain(total)
    .multiply(charges.paypalPercent)
    .done();
  const totalFee = math
    .chain(fixedFee)
    .add(percentageFee)
    .done()
    .toFixed(2);
  return totalFee;
}

function calculateEbayFee(itemCost, category, charges) {
  const cost = itemCost;
  const categoryFee = charges.categories[category];
  const ebayDiscount = charges.ebayDiscount;
  const fee = math
    .chain(cost)
    .multiply(categoryFee)
    .done();
  const discount = math
    .chain(fee)
    .multiply(ebayDiscount)
    .done();
  const ebayTotal = math
    .chain(fee)
    .subtract(discount)
    .done()
    .toFixed(2);
  return ebayTotal;
}

export default async function (order) {
  console.log('processing', order.buyer.username);
  try {
    const retriveCharges = await mongoRetrieveCharges();
    const charges = retriveCharges[0];
    const address = order
      .fulfillmentStartInstructions
      .map((item) => createAddress(item));
    const items = await Promise.all(order.lineItems.map(async(item) => {
      try {
        const itemDetails = await createItemDetails(item, charges);
        return itemDetails;
      } catch (err) {
        throw(err);
      }
    }));
    const total = order.pricingSummary.total.convertedFromValue;
    const username = order.buyer.username;
    const creationDate = order.creationDate;
    const orderId = order.orderId;
    const paymentDetails = createPaymentDetails(order);
    const paypalFee = calculatePaypalFee(total, charges);
    const postage = charges.standardPostage;
    const packaging = charges.standardPacking;
    const ebayFee = items.reduce((acc, item) => {
      return acc + item.itemEbayFee;
    }, 0);
    const totalLandedItemsCost = (items.reduce((acc, item) => {
      return acc + item.landedCostOfProducts;
    }, 0)).toFixed(2);
    const totalFulfillmentCost = math
      .chain(ebayFee)
      .add(paypalFee)
      .add(totalLandedItemsCost)
      .add(postage)
      .add(packaging)
      .done()
      .toFixed(2);
    const profit = math
      .chain(total)
      .subtract(totalFulfillmentCost)
      .done()
      .toFixed(2);
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
      totalFulfillmentCost,
      profit,
      printed: false,
      picked: false,
      dispatched: false,
      postage,
      packaging,
    };
    return output;
  } catch (err) {
    throw(err);
  }
}
