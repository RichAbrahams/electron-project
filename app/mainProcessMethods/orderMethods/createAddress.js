export default function createAddress(order) {
  const container = {};
  if (order.shippingStep.shipTo.fullName) {
    container.fullName = order.shippingStep.shipTo.fullName;
  }
  if (order.shippingStep.shipTo.primaryPhone.phoneNumber) {
    container.phoneNumber = order.shippingStep.shipTo.primaryPhone.phoneNumber;
  }
  if (order.shippingStep.shipTo.contactAddress.addressLine1) {
    container.addressLine1 = order.shippingStep.shipTo.contactAddress.addressLine1;
  }
  if (order.shippingStep.shipTo.contactAddress.addressLine2) {
    container.addressLine2 = order.shippingStep.shipTo.contactAddress.addressLine2;
  }
  if (order.shippingStep.shipTo.contactAddress.city) {
    container.city = order.shippingStep.shipTo.contactAddress.city;
  }
  if (order.shippingStep.shipTo.contactAddress.county) {
    container.county = order.shippingStep.shipTo.contactAddress.county;
  }
  if (order.shippingStep.shipTo.contactAddress.stateOrProvince) {
    container.stateOrProvince = order.shippingStep.shipTo.contactAddress.stateOrProvince;
  }
  if (order.shippingStep.shipTo.contactAddress.postalCode) {
    container.postalCode = order.shippingStep.shipTo.contactAddress.postalCode;
  }
  if (order.shippingStep.shipTo.contactAddress.countryCode) {
    container.countryCode = order.shippingStep.shipTo.contactAddress.countryCode;
  }
  return container;
}
