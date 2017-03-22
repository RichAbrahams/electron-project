import buildProducts from './buildProducts';

function getExchangeRate(totalUSD, totalGBP) {
  return ((100 / totalUSD) * totalGBP) / 100;
}
function getshippingUSDPerKG(consignmentWeight, consignmentShipping) {
  return consignmentShipping / consignmentWeight;
}

function getProductsWeight(consignment) {
  return consignment
    .products
    .reduce((acc, item) => {
      return item.weightKG + acc;
    }, 0);
}

function getTotalUKCharges(duty, vat, clearance) {
  return duty + vat + clearance;
}

export default function buildConsignment(data) {
  const consignment = Object.assign({}, data, {
    weightKG: parseFloat(data.weightKG),
    totalUSD: parseFloat(data.totalUSD),
    productsTotalUSD: parseFloat(data.productsTotalUSD),
    agentServiceUSD: parseFloat(data.agentServiceUSD),
    shippingUSD: parseFloat(data.shippingUSD),
    chnCustomsUSD: parseFloat(data.chnCustomsUSD),
    totalGBP: parseFloat(data.totalGBP),
    ukVatGBP: parseFloat(data.ukVatGBP),
    ukDutyGBP: parseFloat(data.ukDutyGBP),
    ukClearanceGBP: parseFloat(data.ukClearanceGBP),
    products: data.products.map((item) => {
      return Object.assign({}, item, {
        costUSD: parseFloat(item.costUSD),
        weightKG: parseFloat(item.weightKG),
        packagingCostGBP: parseFloat(item.packagingCostGBP),
        postageGBP: parseFloat(item.postageGBP),
        packSize: parseInt(item.packSize, 10),
        quantity: parseInt(item.quantity, 10),
        categoryFee: parseInt(item.categoryFee, 10),
      });
    })
  });
  console.log('entry', consignment);
  const exchangeRate = getExchangeRate(consignment.totalUSD, consignment.totalGBP);
  const shippingUSDPerKG = getshippingUSDPerKG(consignment.weightKG, consignment.shippingUSD);
  const productsWeightKG = getProductsWeight(consignment);
  const totalUKChargesGBP = getTotalUKCharges(consignment.ukDutyGBP, consignment.ukVatGBP, consignment.ukClearanceGBP);
  const rebuiltConsignment = Object.assign({}, consignment, { exchangeRate, shippingUSDPerKG, productsWeightKG, totalUKChargesGBP });
  const rebuiltProducts = buildProducts(rebuiltConsignment);
  const rebuiltConsignmentWithRebuiltProducts = Object.assign({}, rebuiltConsignment, { products: rebuiltProducts });

  console.log('rebuilt', rebuiltConsignmentWithRebuiltProducts);
  return rebuiltConsignmentWithRebuiltProducts;
}
