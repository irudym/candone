// Tasks test
// 
// import { createTask } from '../redux/actions';
import candoneReducer from '../redux/reducers';
import * as TYPES from '../globals/types';

describe('Basic Tasks functions', () => {
  it('creates a new task in (state) task list', () => {
    const action = {
      type: TYPES.ADD_TASK,
      value: {
        id: 100,
        created_at: '24 April 2018',
        title: 'Test task',
        description: 'Just a test task',
        urgency: 1,
        stage: 0,
        persons: [1, 2],
      },
    };
    const result = candoneReducer(undefined, action);
    expect(result.tasks[0].id).toEqual(100);
  });

  it('removes a task from the (state) task list', () => {
    const action = {
      type: TYPES.REMOVE_TASK,
      value: {
        id: 100,
      },
    };
    const state = {
      tasks: [
        {
          id: 100,
          title: 'Test task',
        },
      ],
    };

    const result = candoneReducer(state, action);
    expect(result.tasks.length).toEqual(0);
  });
});
