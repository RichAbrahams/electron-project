import { MongoClient as mongo } from 'mongodb';

export default async function mongoConnect() {
  try {
    const url = 'mongodb://127.0.0.1:27017/ebay';
    const db = await mongo.connect(url);
    return db;
  } catch (err) {
    throw (err);
  }
}
