import mongoConnect from './connect';
import replyToRenderer from '../replyToRenderer';

export default async function retrieveOne(event, action) {
  const { collection, index, value, from } = action.payload;
  console.log('mongoRetrieveOne');
  let type;
  let payload;
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection(collection);
      payload = await col.find({ [index]: value }).toArray();
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

