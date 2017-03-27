import math from 'mathjs';

export default function (items, postage, newProfit, charges) {
  const paypalFixedShare = math
    .chain(charges.paypalFixed)
    .divide(items.length)
    .done();

  const totalNumberItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const postagePerItem = math
    .chain(postage)
    .divide(totalNumberItems)
    .done();

  const packagingPerItem = math
    .chain(charges.standardPacking)
    .divide(totalNumberItems)
    .done();

  const updatedItems = items.map((item) => {
    const itemsPostage = math
      .chain(item.quantity)
      .multiply(postagePerItem)
      .done();

    const itemsPackaging = math
      .chain(item.quantity)
      .multiply(packagingPerItem)
      .done();

    const paypalPercentShare = math
      .chain(item.totalCost)
      .multiply(charges.paypalPercent)
      .done();

    const profit = math
      .chain(item.totalCost)
      .subtract(item.landedCostOfProducts)
      .subtract(itemsPostage)
      .subtract(itemsPackaging)
      .subtract(paypalPercentShare)
      .subtract(paypalFixedShare)
      .subtract(item.itemEbayFee)
      .done();

    return Object.assign({}, item, {
      profit: profit.toFixed(2),
      postage: itemsPostage,
      packaging: itemsPackaging,
    });
  });
  return updatedItems;
}
