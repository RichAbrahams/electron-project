import {mongoRetrieveCharges, mongoRetrieveEbayFees} from './mongoOperations';

function packageItems(order) {
  const items = [];
  order
    .fulfillmentStartInstructions
    .forEach((item, index) => {
      items.push({
        maxEstimatedDeliveryDate: item.maxEstimatedDeliveryDate,
        minEstimatedDeliveryDate: item.minEstimatedDeliveryDate,
        shippingCarrierCode: item.shippingCarrierCode,
        shippingServiceCode: item.shippingServiceCode,
        deliveryAddress: {
          fullName: item.shippingStep.shipTo.fullName,
          phoneNumber: item.shippingStep.shipTo.primaryPhone.phoneNumber,
          addressLine1: item.shippingStep.shipTo.contactAddress.addressLine1,
          addressLine2: item.shippingStep.shipTo.contactAddress.addressLine12,
          city: item.shippingStep.shipTo.contactAddress.city,
          county: item.shippingStep.shipTo.contactAddress.county,
          stateOrProvince: item.shippingStep.shipTo.contactAddress.stateOrProvince,
          postalCode: item.shippingStep.shipTo.contactAddress.postalCode,
          countryCode: item.shippingStep.shipTo.contactAddress.countryCode
        },
        itemDetails: {
          sku: order.lineItems[index].sku,
          title: order.lineItems[index].title,
          quantity: order.lineItems[index].quantity,
          lineItemId: order.lineItems[index].lineItemId,
          deliveryCost: order.lineItems[index].deliveryCost.shippingCost.convertedFromValue,
          itemCost: order.lineItems[index].lineItemCost.convertedFromValue,
          totalCost: order.lineItems[index].total.convertedFromValue
        },
        payment: {
          paymentDate: order.paymentSummary.payments[index].paymentDate,
          paymentMethod: order.paymentSummary.payments[index].paymentMethod,
          paymentStatus: order.paymentSummary.payments[index].paymentStatus
        }
      });
    });
  return items;
}

function calculatePaypal(items, totalPaid, charges) {
  const fixedFee = charges.paypalFixed * items.length;
  const totalPaidInt = totalPaid * 100;
  const totalPaidFeeInt = totalPaidInt * (charges.paypalPercent / 100);
  const totalPaidFeeDec = totalPaidFeeInt / 100;
  const totalPaidFee = totalPaidFeeDec.toFixed(2);
  const totalFee = parseFloat(fixedFee) + parseFloat(totalPaidFee);
  return totalFee.toFixed(2);
}

async function calculateEbay(items, totalPaid, charges) {
  try {
    const skus = items.map((item) => item.itemDetails.sku);
    const skuFees = await mongoRetrieveEbayFees(skus);
    const ebayFeePreDiscountInt = items.reduce((acc, item, index) => {
      const total = item.itemDetails.totalCost;
      const totalPaidInt = total * 100;
      const totalFeeInt = totalPaidInt * (skuFees[index].categoryFee / 100);
      return acc + totalFeeInt;
    }, 0);
    const ebayFeeInt = ebayFeePreDiscountInt * ((100 - charges.ebayDiscount) / 100);
    const ebayFeeDec = ebayFeeInt / 100;
    const ebayFee = ebayFeeDec.toFixed(2);
    return ebayFee;
  } catch (err) {
    throw(err);
  }
}

async function mapFees(orders) {

}

export default async function processNewOrders(orders) {
  try {
    const charges = await mongoRetrieveCharges();
    const processedOrders = await orders.map(async (order) => {
      const username = order.buyer.username;
      const creationDate = order.creationDate;
      const paymentStatus = order.orderPaymentStatus;
      const sellerID = order.sellerId;
      const orderID = order.orderId;
      const items = packageItems(order);
      const totalPaid = items.reduce((acc, item) => {
        return acc + parseFloat(item.itemDetails.totalCost).toFixed(2);
      }, 0);
      const paypalFee = calculatePaypal(items, totalPaid, charges[0]);
      console.log(typeof paypalFee);
      const ebayFee = await calculateEbay(items, totalPaid, charges[0]);
      console.log('returned ebayfee', ebayFee);
      const totalFees = paypalFee + ebayFee;
      return {
        username,
        creationDate,
        items,
        paymentStatus,
        sellerID,
        orderID,
        totalPaid,
        paypalFee,
        ebayFee,
        totalFees
      };
    });
    const output = await processedOrders;
  } catch (err) {
    throw (err);
  }
};
