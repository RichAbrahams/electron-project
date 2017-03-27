import mongoConnect from './connect';
import replyToRenderer from '../replyToRenderer';

export default async function retrieveMany(event, action) {
  const { collection, index, values, from } = action.payload;
  let type;
  let payload;
  try {
    const db = await mongoConnect();
    try {
      const col = db.collection(collection);
      payload = await col.find({
        [index]: {
          $in: values
        }
      }).toArray();
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
