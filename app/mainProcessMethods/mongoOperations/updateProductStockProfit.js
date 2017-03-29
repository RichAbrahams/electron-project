
export default async function updateProductStockProfit(db, productDetails) {
  const { productID, quantity, profit } = productDetails;
  try {
    const col = db.collection('products');
    await col.update({
      productID
    }, {
      $inc: {
        sold: quantity,
        profit
      }
    });
    return;
  } catch (err) {
    return err;
  }
}
