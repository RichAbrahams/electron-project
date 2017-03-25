
import {
  NEXT_FORM,
  PREVIOUS_FORM,
  SET_PAGE_TO_ONE,
  GET_CATEGORIES,
} from './constants';

export function nextForm() {
  return {
    type: NEXT_FORM,
  };
}

export function previousForm() {
  return {
    type: PREVIOUS_FORM,
  };
}

export function SetPageTo1() {
  return {
    type: SET_PAGE_TO_ONE,
  };
}

export function getCategories() {
  console.log('action getCategories');
  return {
    type: GET_CATEGORIES,
    payload: {
      collection: 'charges',
      index: '',
      value: '',
      from: GET_CATEGORIES,
    }
  };
}


