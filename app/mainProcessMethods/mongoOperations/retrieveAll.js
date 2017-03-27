import mongoConnect from './connect';
import replyToRenderer from '../replyToRenderer';

export default async function retrieveAll(event, action) {
  const { collection, from } = action.payload;
  console.log('mongoRetrieveOne');
  let type;
  let payload;
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection(collection);
      payload = await col
        .find()
        .toArray();
      type = `${from}_SUCCESS`;
      db.close();
    } catch (err) {
      type = `${from}_ERROR`;
      payload = err;
      db.close();
    }
  } catch (err) {
    type = `${from}_ERROR`;
    payload = err;
  } finally {
    console.log('mongoRetrieveOne reply:', type, payload);
    replyToRenderer(event, { type, payload });
  }
}
