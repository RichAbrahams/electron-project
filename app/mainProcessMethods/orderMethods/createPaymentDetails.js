export default function createPaymentDetails(order) {
  const container = order
    .paymentSummary
    .payments
    .map((item) => {
      return { paymentDate: item.paymentDate, paymentMethod: item.paymentMethod, paymentStatus: item.paymentStatus };
    });
  return container;
}
