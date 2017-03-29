export default async function retrieveCharges(db) {
  try {
    const col = db.collection('charges');
    const payload = await col
      .find()
      .toArray();
    return payload;
  } catch (err) {
    throw (err);
  }
}
