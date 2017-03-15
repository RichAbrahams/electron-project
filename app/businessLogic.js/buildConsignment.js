import buildProducts from './buildProducts';

function getExchangeRate(totalUSD, totalGBP) {
  return ((100 / totalUSD) * totalGBP) / 100;
}
function getshippingUSDPerKG(consignmentWeight, consignmentShipping) {
  console.log(consignmentWeight, consignmentShipping);
  return consignmentShipping / consignmentWeight;
}

function getProductsWeight(consignment) {
  return consignment.products.reduce((acc, item) => {
    return item.weightKG + acc;
  }, 0);
}

function getTotalUKCharges(duty, vat, clearance) {
  return duty + vat + clearance;
}

export default function buildConsignment(consignment) {
  const exchangeRate = getExchangeRate(consignment.totalUSD, consignment.totalGBP);
  const shippingUSDPerKG = getshippingUSDPerKG(consignment.weightKG, consignment.shippingCostUSD);
  const productsWeightKG = getProductsWeight(consignment);
  const totalUKChargesGBP = getTotalUKCharges(consignment.ukDutyGBP, consignment.ukVatGBP, consignment.ukClearanceGBP);
  const rebuiltConsigment = Object.assign({}, consignment, { exchangeRate, shippingUSDPerKG, productsWeightKG, totalUKChargesGBP });
  const rebuiltProducts = buildProducts(rebuiltConsigment);
  const rebuiltConsigmentWithProducts = Object.assign({}, rebuiltConsigment, { products: rebuiltProducts });
  return rebuiltConsigmentWithProducts;
}
