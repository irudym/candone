/**
 * Candone - cards for project management
 *           project management application inspired by Kanban board
 * Igor Rudym (C) 2018
 */
import * as TYPES from '../globals/types';

// Action handlers
const ACTION_HANDLERS = {
  [TYPES.ADD_PERSON]: (state, action) => (
    {
      ...state,
      persons: [
        ...state.persons,
        action.value,
      ],
    }
  ),
  [TYPES.SET_PERSON_TYPES]: (state, action) => (
    {
      ...state,
      personTypes: action.value,
    }
  ),
  [TYPES.FETCH_FAILED]: (state, action) => (
    {
      ...state,
      errors: action.errors,
    }
  ),
  [TYPES.POST_FAILED]: (state, action) => (
    {
      ...state,
      errors: action.errors,
    }
  ),
  [TYPES.SET_PERSONS]: (state, action) => (
    {
      ...state,
      persons: action.value,
    }
  ),
  [TYPES.CHANGE_PERSON]: (state, action) => (
    {
      ...state,
      persons: state.persons.map((person) => {
        if (person.id === action.value.id) return action.value;
        return person;
      }),
    }
  ),
  [TYPES.REMOVE_PERSON]: (state, action) => (
    {
      ...state,
      persons: state.persons.filter(person => person.id !== action.value.id),
    }
  ),
  [TYPES.ADD_TASK]: (state, action) => (
    {
      ...state,
      tasks: [
        ...state.tasks,
        action.value,
      ],
    }
  ),
  [TYPES.SET_TASKS]: (state, action) => (
    {
      ...state,
      tasks: action.value,
    }
  ),
  [TYPES.CHANGE_TASK]: (state, action) => (
    {
      ...state,
      tasks: state.tasks.map((task) => {
        if (task.id === action.value.id) return action.value;
        return task;
      }),
    }
  ),
  [TYPES.REMOVE_TASK]: (state, action) => (
    {
      ...state,
      tasks: state.tasks.filter(task => task.id !== action.value.id),
    }
  ),
  [TYPES.SET_NOTES]: (state, action) => (
    {
      ...state,
      notes: action.value,
    }
  ),
  [TYPES.ADD_NOTE]: (state, action) => (
    {
      ...state,
      notes: [
        ...state.notes,
        action.value,
      ],
    }
  ),
  [TYPES.CHANGE_NOTE]: (state, action) => (
    {
      ...state,
      notes: state.notes.map((note) => {
        if (note.id === action.value.id) return action.value;
        return note;
      }),
    }
  ),
  [TYPES.REMOVE_NOTE]: (state, action) => (
    {
      ...state,
      notes: state.notes.filter(note => note.id !== action.value.id),
    }
  ),
  [TYPES.ADD_PROJECT]: (state, action) => (
    {
      ...state,
      projects: [
        ...state.projects,
        action.value,
      ],
    }
  ),
  [TYPES.SET_PROJECTS]: (state, action) => (
    {
      ...state,
      projects: action.value,
    }
  ),
  [TYPES.CHANGE_PROJECT]: (state, action) => (
    {
      ...state,
      projects: state.projects.map((project) => {
        if (project.id === action.value.id) return action.value;
        return project;
      }),
    }
  ),
  [TYPES.REMOVE_PROJECT]: (state, action) => (
    {
      ...state,
      projects: state.projects.filter(project => project.id !== action.value.id),
    }
  ),
  [TYPES.SET_CURRENT_PROJECT]: (state, action) => (
    {
      ...state,
      currentProject: action.value,
    }
  ),
};


/**
 * Reducers
 */
export const initialState = {
  persons: [],
  personTypes: [],
  errors: [],
  tasks: [],
  notes: [],
  projects: [],
  currentProject: {
    id: null,
    tasks: [],
    notes: [],
  },
};

const candoneReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

export default candoneReducer;
