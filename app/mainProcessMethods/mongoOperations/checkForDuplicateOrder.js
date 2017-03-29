export default async function checkForDuplicate(db, orderId) {
  try {
    const col = db.collection('orders');
    const payload = await col.findOne({ orderId });
    return payload;
  } catch (err) {
    console.log(err);
    throw (err);
  }
}
