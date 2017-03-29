import replyToRenderer from '../replyToRenderer';

export default async function saveOne(db, event, action) {
  const { collection, values, from } = action.payload;
  try {
    const col = db.collection(collection);
    const payload = await col.insert(values);
    const type = `${from}_SUCCESS`;
    replyToRenderer(event, { type, payload });
  } catch (err) {
    const type = `${from}_ERROR`;
    const payload = err;
    replyToRenderer(event, { type, payload });
  }
}
