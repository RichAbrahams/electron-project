import {MongoClient as mongo} from 'mongodb';
import replyToRenderer from './replyToRenderer';

// async function mongoConnect() {
//   try {
//     const url = 'mongodb://127.0.0.1:27017/ebay';
//     const db = await mongo.connect(url);
//     return db;
//   } catch (err) {
//     throw(err);
//   }
// }

// export async function mongoSaveOne(event, action) {
//   const {collection, values, from} = action.payload;
//   let type;
//   let payload;
//   try {
//     const db = await mongoConnect();
//     try {
//       const col = db.collection(collection);
//       payload = await col.insert(values);
//       type = `${from}_SUCCESS`;
//       db.close();
//     } catch (err) {
//       type = `${from}_ERROR`;
//       payload = err;
//       db.close();
//     }
//   } catch (err) {
//     type = `${from}_ERROR`;
//     payload = err;
//   } finally {
//     replyToRenderer(event, {type, payload});
//   }
// }

// export async function mongoSaveMany(event, action) {
//   const {collection, values, from} = action.payload;
//   let type;
//   let payload;
//   try {
//     const db = await mongoConnect();
//     try {
//       const col = db.collection(collection);
//       payload = await col.insert(values);
//       type = `${from}_SUCCESS`;
//       db.close();
//     } catch (err) {
//       type = `${from}_ERROR`;
//       payload = err;
//       db.close();
//     }
//   } catch (err) {
//     type = `${from}_ERROR`;
//     payload = err;
//   } finally {
//     replyToRenderer(event, {type, payload});
//   }
// }

// export async function mongoRetrieveMany(event, action) {
//   const {collection, index, values, from} = action.payload;
//   let type;
//   let payload;
//   try {
//     const db = await mongoConnect();
//     try {
//       const col = db.collection(collection);
//       payload = await col.find({
//         [index]: {
//           $in: values
//         }
//       }).toArray();
//       type = `${from}_SUCCESS`;
//       db.close();
//     } catch (err) {
//       type = `${from}_ERROR`;
//       payload = err;
//       db.close();
//     }
//   } catch (err) {
//     type = `${from}_ERROR`;
//     payload = err;
//   } finally {
//     replyToRenderer(event, {type, payload});
//   }
// }

// export async function mongoRetrieveOne(event, action) {
//   const {collection, index, value, from} = action.payload;
//   console.log('mongoRetrieveOne');
//   let type;
//   let payload;
//   try {
//     const db = await mongoConnect();
//     try {
//       const col = db.collection(collection);
//       payload = await col.find({[index]: value}).toArray();
//       type = `${from}_SUCCESS`;
//       db.close();
//     } catch (err) {
//       type = `${from}_ERROR`;
//       payload = err;
//       db.close();
//     }
//   } catch (err) {
//     type = `${from}_ERROR`;
//     payload = err;
//   } finally {
//     console.log('mongoRetrieveOne reply:', type, payload);
//     replyToRenderer(event, {type, payload});
//   }
// }

// export async function mongoRetrieveAll(event, action) {
//   const {collection, from} = action.payload;
//   console.log('mongoRetrieveOne');
//   let type;
//   let payload;
//   try {
//     const db = await mongoConnect();
//     try {
//       const col = db.collection(collection);
//       payload = await col
//         .find()
//         .toArray();
//       type = `${from}_SUCCESS`;
//       db.close();
//     } catch (err) {
//       type = `${from}_ERROR`;
//       payload = err;
//       db.close();
//     }
//   } catch (err) {
//     type = `${from}_ERROR`;
//     payload = err;
//   } finally {
//     console.log('mongoRetrieveOne reply:', type, payload);
//     replyToRenderer(event, {type, payload});
//   }
// }

// export async function mongoRetrieveCharges() {
//   try {
//     const db = await mongoConnect();
//     const col = db.collection('charges');
//     const payload = await col
//       .find()
//       .toArray();
//     db.close();
//     return payload;
//   } catch (err) {
//     throw(err);
//   }
// }

// export async function mongoRetrieveProduct(sku) {
//   try {
//     const db = await mongoConnect();
//     const col = db.collection('products');
//     const payload = await col.find({
//       productID: sku,
//     }).toArray();
//     db.close();
//     return payload;
//   } catch (err) {
//     throw(err);
//   }
// }

