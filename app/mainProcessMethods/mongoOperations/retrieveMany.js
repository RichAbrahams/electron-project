import replyToRenderer from '../replyToRenderer';

export default async function retrieveMany(db, event, action) {
  const { collection, index, values, from } = action.payload;
  try {
    const col = db.collection(collection);
    const payload = await col.find({
      [index]: {
        $in: values
      }
    }).toArray();
    const type = `${from}_SUCCESS`;
    replyToRenderer(event, { type, payload });
  } catch (err) {
    const type = `${from}_ERROR`;
    replyToRenderer(event, { type, err });
  }
}
