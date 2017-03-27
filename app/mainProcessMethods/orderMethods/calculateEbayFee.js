import math from 'mathjs';

export default function calculateEbayFee(itemCost, category, charges) {
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