import mongoConnect from './connect';

export default async function updateProductStockProfit(productDetails) {
  const { productID, quantity, profit  } = productDetails;
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection('products');
      await col.update(
        { productID },
        { $inc: { sold: quantity, profit } }
      );
      db.close();
      return;
    } catch (err) {
      db.close();
      return err;
    }
  } catch (err) {
    return err;
  }
}
