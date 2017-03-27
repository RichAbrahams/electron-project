import mongoConnect from './connect';
import replyToRenderer from '../replyToRenderer';

export default async function saveMany(event, action) {
  const { collection, values, from } = action.payload;
  let type;
  let payload;
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection(collection);
      payload = await col.insert(values);
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
    replyToRenderer(event, { type, payload });
  }
}
