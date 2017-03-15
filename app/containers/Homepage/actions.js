import { TEST_THUNK, THUNK_UPDATE } from './constants';

export function testThunk() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: THUNK_UPDATE,
        data: 'helloo!'
      });
    }, 3000);
  };
}

