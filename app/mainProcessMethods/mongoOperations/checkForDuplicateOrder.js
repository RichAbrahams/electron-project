import mongoConnect from './connect';

export default async function checkForDuplicate(orderId) {
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection('orders');
      const payload = await col.findOne({ orderId });
      db.close();
      return payload;
    } catch (err) {
      db.close();
      throw (err);
    }
  } catch (err) {
    throw (err);
  }
}

