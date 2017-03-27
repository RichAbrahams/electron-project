import math from 'mathjs';

export default function calculatePaypalFee(total, charges) {
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
