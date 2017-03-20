import {
  MONGO_RETRIEVE_ONE,
  MONGO_RETRIEVE_MANY,
  MONGO_SAVE_MANY,
  MONGO_SAVE_ONE,
} from './mainProcessConstants';

export function mongoRetrieveOne(payload) {
  return {
    type: MONGO_RETRIEVE_ONE,
    payload,
  };
}

export function mongoRetrieveMany(payload) {
  return {
    type: MONGO_RETRIEVE_MANY,
    payload,
  };
}

export function mongoSaveMany(payload) {
  return {
    type: MONGO_SAVE_MANY,
    payload,
  };
}

export function mongoSaveOne(payload) {
  return {
    type: MONGO_SAVE_ONE,
    payload,
  };
}
