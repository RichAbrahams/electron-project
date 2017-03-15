//const mongo = require('mongodb').MongoClient;
import { MongoClient as mongo } from 'mongodb';

function mongoConnect() {
  return new Promise((resolve, reject) => {
    const url = 'mongodb://127.0.0.1:27017/ebay';
    mongo.connect(url, (err, db) => {
      if (err) { reject(err); }
      resolve(db);
    });
  });
}

export async function mongoSaveOne(collection, data) {

}

export async function mongoSaveMany(collection, data) {
  return new Promise(async function (resolve, reject) {
    try {
      const db = await mongoConnect();
      const saved = db.collection(collection).insertMany(data);
      resolve(saved);
    } catch (err) {
      reject(err);
    }
  });
}

export async function mongoRetrieveMany(collection, field, data) {
  return new Promise(async function (resolve, reject) {
    try {
      const db = await mongoConnect();
      const col = db.collection(collection);
      const found = col.find({ [field]: { $in: data } }).toArray();
      resolve(found);
    } catch (err) {
      reject(err);
    }
  });
}

export async function mongoRetrieveDocument(collection, data) {
  return new Promise(async function (resolve, reject) {
    try {
      const db = await mongoConnect();
      const col = db.collection(collection);
      const found = col.find(data).toArray();
      resolve(found);
    } catch (err) {
      reject(err);
    }
  });
}
