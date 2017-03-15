
import {
  NEXT_FORM,
  PREVIOUS_FORM,
  SET_PAGE_TO_ONE,
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


