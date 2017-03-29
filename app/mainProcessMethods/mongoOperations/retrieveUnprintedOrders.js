import replyToRenderer from '../replyToRenderer';

export default async function retrieveUnprintedOrders(db, event, action) {
  try {
    const col = db.collection('orders');
    const payload = await col.find({
      printed: false }).toArray();
    const type = `${action.type}_SUCCESS`;
    
    replyToRenderer(event, { type, payload });
  } catch (err) {
    const type = `${action.type}_ERROR`;
    replyToRenderer(event, { type, err });
  }
}
