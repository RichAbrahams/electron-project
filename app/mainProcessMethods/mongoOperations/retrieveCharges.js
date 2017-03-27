import mongoConnect from './connect';

export default async function retrieveCharges() {
  try {
    const db = await mongoConnect();
    const col = db.collection('charges');
    const payload = await col
      .find()
      .toArray();
    db.close();
    return payload;
  } catch (err) {
    throw(err);
  }
}
