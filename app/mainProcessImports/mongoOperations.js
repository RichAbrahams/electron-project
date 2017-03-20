import { MongoClient as mongo } from 'mongodb';
import { mongoRetrieveOneSuccess, mongoRetrieveManySuccess, mongoSaveManySuccess, mongoSaveOneSuccess } from './mainProcessActions';

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
  const { collection, values } = action.payload;
  const db = await mongoConnect();
  const col = db.collection(collection);
  const result = await col.insert(values);
  db.close();
  event
    .sender
    .send('messageFromMain', mongoSaveOneSuccess(result));
}

export async function mongoSaveMany(event, action) {
  const { collection, values } = action.payload;
  const db = await mongoConnect();
  const col = db.collection(collection);
  const result = await col.insert(values);
  db.close();
  event
    .sender
    .send('messageFromMain', mongoSaveManySuccess(result));
}

export async function mongoRetrieveMany(event, action) {
  const { collection, index, values } = action.payload;
  const db = await mongoConnect();
  const col = db.collection(collection);
  const result = await col.find({
    [index]: {
      $in: values
    }
  }).toArray();
  db.close();
  event
    .sender
    .send('messageFromMain', mongoRetrieveManySuccess(result));
}

export async function mongoRetrieveOne(event, action) {
  const { collection, index, value } = action.payload;
  const db = await mongoConnect();
  const col = db.collection(collection);
  const result = await col.find({ [index]: value }).toArray();
  db.close();
  event
    .sender
    .send('messageFromMain', mongoRetrieveOneSuccess(result));
}
