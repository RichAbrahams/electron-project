import { MongoClient as mongo } from 'mongodb';

function mongoConnect() {
  return new Promise((resolve, reject) => {
    const url = 'mongodb://127.0.0.1:27017/ebay';
    mongo.connect(url, (err, db) => {
      if (err) {
        reject(err);
      }
      resolve(db);
    });
  });
}

export async function mongoSaveOne(event, action) {
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
    event
      .sender
      .send('messageFromMain', { type, payload });
  }
}

export async function mongoSaveMany(event, action) {
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
    event
      .sender
      .send('messageFromMain', { type, payload });
  }
}

export async function mongoRetrieveMany(event, action) {
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
    event
      .sender
      .send('messageFromMain', { type, payload });
  }
}

export async function mongoRetrieveOne(event, action) {
  const { collection, index, value, from } = action.payload;
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
    event
      .sender
      .send('messageFromMain', { type, payload });
  }
}

