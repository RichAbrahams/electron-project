
export default async function retrieveProduct(db, sku) {
  try {
    const col = db.collection('products');
    const payload = await col.find({
      productID: sku,
    }).toArray();
    return payload;
  } catch (err) {
    throw (err);
  }
}
