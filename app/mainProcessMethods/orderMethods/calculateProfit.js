import math from 'mathjs';

export default function calculateProfit(total, fulfillmentCost) {
  const profit = math
    .chain(total)
    .subtract(fulfillmentCost)
    .done()
    .toFixed(2);
  return profit;
}
