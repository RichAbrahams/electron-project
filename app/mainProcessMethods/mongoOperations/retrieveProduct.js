import mongoConnect from './connect';

export default async function retrieveProduct(sku) {
  try {
    const db = await mongoConnect();
    const col = db.collection('products');
    const payload = await col.find({
      productID: sku,
    }).toArray();
    db.close();
    return payload;
  } catch (err) {
    throw (err);
  }
}
