import { toIDList } from '../lib/utils';
import * as TYPES from '../globals/types';

export const addPerson = value => (
  {
    type: TYPES.ADD_PERSON,
    value,
  }
);

// API related actions
export const fetchPersonTypes = value => (
  {
    type: TYPES.FETCH_PERSON_TYPES,
    payload: {
      url: value,
    },
  }
);

export const fetchPersons = value => (
  {
    type: TYPES.FETCH_PERSONS,
    payload: {
      url: value,
    },
  }
);

export const createPerson = value => (
  {
    type: TYPES.CREATE_PERSON,
    payload: {
      ...value,
    },
  }
);

export const updatePerson = value => (
  {
    type: TYPES.UPDATE_PERSON,
    payload: value,
  }
);

export const deletePerson = value => (
  {
    type: TYPES.DELETE_PERSON,
    payload: { ...value },
  }
);

export const createTask = value => (
  {
    type: TYPES.CREATE_TASK,
    payload: {
      ...value,
    },
  }
);

export const fetchTasks = value => (
  {
    type: TYPES.FETCH_TASKS,
    payload: {
      url: value,
    },
  }
);

export const updateTask = value => (
  {
    type: TYPES.UPDATE_TASK,
    payload: { ...value },
  }
);

export const deleteTask = value => (
  {
    type: TYPES.DELETE_TASK,
    payload: { ...value },
  }
);

export const fetchNotes = value => (
  {
    type: TYPES.FETCH_NOTES,
    payload: {
      url: value,
    },
  }
);


export const createNote = value => (
  {
    type: TYPES.CREATE_NOTE,
    payload: {
      ...value,
    },
  }
);

export const updateNote = value => (
  {
    type: TYPES.UPDATE_NOTE,
    payload: { ...value },
  }
);

export const deleteNote = value => (
  {
    type: TYPES.DELETE_NOTE,
    payload: { ...value },
  }
);

export const fetchProjects = value => (
  {
    type: TYPES.FETCH_PROJECTS,
    payload: {
      url: value,
    },
  }
);

export const createProject = (value) => {
  // Extract IDs from projects related arrays: notes, tasks, persons
  const tasks = toIDList(value.project.tasks);
  const notes = toIDList(value.project.notes);
  // const persons = toIds(value.project.persons);
  // TODO: something tells me that the code below is very memory intense
  return {
    type: TYPES.CREATE_PROJECT,
    payload: {
      ...value,
      project: {
        ...value.project,
        tasks,
        notes,
        // persons,
      },
    },
  };
};

export const updateProject = (value) => {
  const tasks = toIDList(value.project.tasks);
  const notes = toIDList(value.project.notes);
  return {
    type: TYPES.UPDATE_PROJECT,
    payload: {
      ...value,
      project: {
        ...value.project,
        tasks,
        notes,
      },
    },
  };
};

export const deleteProject = value => (
  {
    type: TYPES.DELETE_PROJECT,
    payload: { ...value },
  }
);

export const reloadProject = value => (
  {
    type: TYPES.RELOAD_PROJECT,
    payload: { ...value },
  }
);

export const setCurrentProject = value => (
  {
    type: TYPES.SET_CURRENT_PROJECT,
    value,
  }
);

export default addPerson;
