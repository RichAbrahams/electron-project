const validate = values => {
  const errors = {};
  if (!values.consignmentID) {
    errors.consignmentID = 'Required';
  }
  if (!values.weightKG || !/^-?\d+\.?\d*$/.test(values.weightKG)) {
    errors.weightKG = 'Required';
  }
  if (!values.totalUSD || !/^-?\d+\.?\d*$/.test(values.totalUSD)) {
    errors.totalUSD = 'Required';
  }
  if (!values.productsTotalUSD || !/^-?\d+\.?\d*$/.test(values.productsTotalUSD)) {
    errors.productsTotalUSD = 'Required';
  }
  if (!values.productsTotalUSD || !/^-?\d+\.?\d*$/.test(values.productsTotalUSD)) {
    errors.productsTotalUSD = 'Required';
  }
  if (!values.agentServiceUSD || !/^-?\d+\.?\d*$/.test(values.agentServiceUSD)) {
    errors.agentServiceUSD = 'Required';
  }
  if (!values.shippingUSD || !/^-?\d+\.?\d*$/.test(values.shippingUSD)) {
    errors.shippingUSD = 'Required';
  }
  if (!values.chnCustomsUSD || !/^-?\d+\.?\d*$/.test(values.chnCustomsUSD)) {
    errors.chnCustomsUSD = 'Required';
  }
  if (!values.totalGBP || !/^-?\d+\.?\d*$/.test(values.totalGBP)) {
    errors.totalGBP = 'Required';
  }
  if (!values.ukVatGBP || !/^-?\d+\.?\d*$/.test(values.ukVatGBP)) {
    errors.ukVatGBP = 'Required';
  }
  if (!values.ukDutyGBP || !/^-?\d+\.?\d*$/.test(values.ukDutyGBP)) {
    errors.ukDutyGBP = 'Required';
  }
  if (!values.ukClearanceGBP || !/^-?\d+\.?\d*$/.test(values.ukClearanceGBP)) {
    errors.ukClearanceGBP = 'Required';
  } if (!values.products || !values.products.length) {
    errors.products = { _error: 'At least one product must be entered' };
  } else {
    const productsArrayErrors = [];
    values.products.forEach((product, productIndex) => {
      const productErrors = {};
      if (!product || !product.productID) {
        productErrors.productID = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.productName) {
        productErrors.productName = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.dateAdded) {
        productErrors.dateAdded = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.costUSD) {
        productErrors.costUSD = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.weightKG) {
        productErrors.weightKG = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.quantity) {
        productErrors.quantity = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.packSize) {
        productErrors.packSize = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.packagingCostGBP) {
        productErrors.packagingCostGBP = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.postageGBP) {
        productErrors.postageGBP = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
      if (!product || !product.categoryFeePercent) {
        productErrors.categoryFeePercent = 'Required';
        productsArrayErrors[productIndex] = productErrors;
      }
    });
    if (productsArrayErrors.length) {
      errors.products = productsArrayErrors;
    }
  }
  return errors;
};

export default validate;
