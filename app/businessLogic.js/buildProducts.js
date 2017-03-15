
function getPercentOfConsigmentCost(consignmentProductsTotal, productCost) {
  return (100 / consignmentProductsTotal) * productCost;
}

function getPercentOfProductsWeight(productsWeightKG, productWeight) {
  return (100 / productsWeightKG) * productWeight;
}

function getShareOfShippingCost(consignmentShipping, productWeightPercent) {
  return (consignmentShipping / 100) * productWeightPercent;
}

function getShareOfChnCustoms(consignmentChnCustoms, productWeightPercent) {
  return (consignmentChnCustoms / 100) * productWeightPercent;
}

function getShareOfAgentServiceFee(agentService, productCostPercent) {
  return (agentService / 100) * productCostPercent;
}

function GetPreUKCostUSD(costUSD, shippingCostUSD, chnCustomsCostUSD, agentServiceUSD) {
  return costUSD + shippingCostUSD + chnCustomsCostUSD + agentServiceUSD;
}

function getPreUKCostGBP(exchangeRate, preUKCostUSD) {
  return preUKCostUSD * exchangeRate;
}

function getPreUKCostPercent(totalUSD, preUKCostUSD) {
  return (100 / totalUSD) * preUKCostUSD;
}

function getUKTax(totalUKChargesGBP, preUKCostPercent) {
  return (totalUKChargesGBP / 100) * preUKCostPercent;
}

function getProductLandedTotalGBP(preUKCostGBP, UKTaxGBP) {
  return preUKCostGBP + UKTaxGBP;
}

function getUnitCost(productLandedTotalGBP, quantity) {
  return productLandedTotalGBP / quantity;
}

function getPackCost(unitCost, packSize) {
  return unitCost * packSize;
}

function extraProductKeys(consignment, product) {
  const productsCostPercent = getPercentOfConsigmentCost(consignment.productsTotalUSD, product.costUSD);
  const productsWeightPercent = getPercentOfProductsWeight(consignment.productsWeightKG, product.weightKG);
  const shippingCostUSD = getShareOfShippingCost(consignment.shippingCostUSD, productsWeightPercent);
  const chnCustomsCostUSD = getShareOfChnCustoms(consignment.chnCustomsUSD, productsWeightPercent);
  const agentServiceUSD = getShareOfAgentServiceFee(consignment.agentServiceUSD, productsCostPercent);
  const preUKCostUSD = GetPreUKCostUSD(product.costUSD, shippingCostUSD, chnCustomsCostUSD, agentServiceUSD);
  const preUKCostGBP = getPreUKCostGBP(consignment.exchangeRate, preUKCostUSD);
  const preUKCostPercent = getPreUKCostPercent(consignment.totalUSD, preUKCostUSD);
  const UKTaxGBP = getUKTax(consignment.totalUKChargesGBP, preUKCostPercent);
  const productLandedTotalGBP = getProductLandedTotalGBP(preUKCostGBP, UKTaxGBP);
  const unitCostGBP = getUnitCost(productLandedTotalGBP, product.quantity);
  const packCostGBP = getPackCost(unitCostGBP, product.packSize);

  return {
    productsCostPercent,
    productsWeightPercent,
    shippingCostUSD,
    chnCustomsCostUSD,
    agentServiceUSD,
    preUKCostUSD,
    preUKCostGBP,
    preUKCostPercent,
    UKTaxGBP,
    productLandedTotalGBP,
    unitCostGBP,
    packCostGBP,
  };
}

export default function buildProducts(consignment) {
  const inputProducts = consignment.products;
  const output = inputProducts.map((item) => Object.assign({}, item, extraProductKeys(consignment, item)));
  return output;
}
