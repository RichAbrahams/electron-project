import {
  MONGO_RETRIEVE_ONE,
  MONGO_RETRIEVE_ONE_SUCCESS,
  MONGO_RETRIEVE_ONE_ERROR,
  MONGO_RETRIEVE_MANY,
  MONGO_RETRIEVE_MANY_SUCCESS,
  MONGO_RETRIEVE_MANY_ERROR,
  MONGO_SAVE_MANY,
  MONGO_SAVE_MANY_SUCCESS,
  MONGO_SAVE_MANY_ERROR,
  MONGO_SAVE_ONE,
  MONGO_SAVE_ONE_SUCCESS,
  MONGO_SAVE_ONE_ERROR,
} from './mainProcessConstants';

export function mongoRetrieveOne(payload) {
  return {
    type: MONGO_RETRIEVE_ONE,
    payload,
  };
}

export function mongoRetrieveOneSuccess(payload) {
  return {
    type: MONGO_RETRIEVE_ONE_SUCCESS,
    payload,
  };
}

export function mongoRetrieveMany(payload) {
  return {
    type: MONGO_RETRIEVE_MANY,
    payload,
  };
}

export function mongoRetrieveManySuccess(payload) {
  return {
    type: MONGO_RETRIEVE_MANY_SUCCESS,
    payload,
  };
}

export function mongoSaveMany(payload) {
  return {
    type: MONGO_SAVE_MANY,
    payload,
  };
}

export function mongoSaveManySuccess(payload) {
  return {
    type: MONGO_SAVE_MANY_SUCCESS,
    payload,
  };
}

export function mongoSaveOne(payload) {
  return {
    type: MONGO_SAVE_ONE,
    payload,
  };
}

export function mongoSaveOneSuccess(payload) {
  return {
    type: MONGO_SAVE_ONE_SUCCESS,
    payload,
  };
}
