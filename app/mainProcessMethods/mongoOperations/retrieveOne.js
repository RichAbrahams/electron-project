import replyToRenderer from '../replyToRenderer';

export default async function retrieveOne(db, event, action) {
  const { collection, index, value, from } = action.payload;
  console.log('mongoRetrieveOne');
  try {
    const col = db.collection(collection);
    const payload = await col.find({ [index]: value }).toArray();
    const type = `${from}_SUCCESS`;
    replyToRenderer(event, { type, payload });
  } catch (err) {
    const type = `${from}_ERROR`;
    const payload = err;
    replyToRenderer(event, { type, payload });
  }
}
