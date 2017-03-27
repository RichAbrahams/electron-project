import math from 'mathjs';

export default function calculateFulfillmentCost(ebayFee, paypalFee, totalLandedItemsCost, postage, packaging) {
  const totalFulfillmentCost = math
    .chain(ebayFee)
    .add(paypalFee)
    .add(totalLandedItemsCost)
    .add(postage)
    .add(packaging)
    .done()
    .toFixed(2);
  return totalFulfillmentCost;
}

