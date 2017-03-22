import shortid from 'shortid';

export const consignment = {
  consignmentID: shortid.generate(),
  weightKG: 20.49,
  totalUSD: 483.71,
  totalGBP: 418.48,
  productsTotalUSD: 299.38,
  shippingCostUSD: 163.94,
  agentServiceUSD: 19.16,
  chnCustomsUSD: 1.23,
  ukVatGBP: 115.87,
  ukDutyGBP: 12.47,
  ukClearanceGBP: 13.50,
  products: [
    {
      productID: shortid.generate(),
      productName: 'product1',
      costUSD: 87.69,
      weightKG: 7.57,
      quantity: 1500,
      packSize: 5,
      packagingCostGBP: 0.07,
      postageGBP: 0.75,
      categoryFeePercent: 0.11
    }, {
      productID: shortid.generate(),
      productName: 'product2',
      costUSD: 87.69,
      weightKG: 7.57,
      quantity: 1500,
      packSize: 5,
      packagingCostGBP: 0.07,
      postageGBP: 0.75,
      categoryFee: 0.11
    }, {
      productID: shortid.generate(),
      productName: 'product3',
      costUSD: 94.15,
      weightKG: 4.45,
      quantity: 500,
      packSize: 1,
      packagingCostGBP: 0.07,
      postageGBP: 0.75,
      categoryFee: 0.11
    }, {
      productID: shortid.generate(),
      productName: 'product4',
      costUSD: 18.77,
      weightKG: 0.854,
      quantity: 200,
      packSize: 1,
      packagingCostGBP: 0.07,
      postageGBP: 0.75,
      categoryFee: 0.11
    }, {
      productID: shortid.generate(),
      productName: 'product5',
      costUSD: 11.08,
      weightKG: 0.112,
      quantity: 100,
      packSize: 3,
      packagingCostGBP: 0.07,
      postageGBP: 0.75,
      categoryFee: 0.11
    }
  ]
};

