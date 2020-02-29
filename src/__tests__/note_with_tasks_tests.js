/*
 *  Note test extended with tasks
 */

import candoneReducer from '../redux/reducers';
import * as TYPES from '../globals/types';

describe('Extended note operations', () => {
  it('creates a new note with task', () => {
    const action = {
      type: TYPES.ADD_NOTE,
      volume: {
        id: 100,

      },
    };
  });
});
