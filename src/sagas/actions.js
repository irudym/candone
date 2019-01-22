/**
 * Candone - cards for project management
 *           project management application inspired by Kanban board
 * Igor Rudym (C) 2018
 *
 * Saga actions to fetch and pass data to candore-core API
 * more about Saga: https://github.com/redux-saga/redux-saga
 */
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as API from '../lib/api';
import * as TYPES from '../globals/types';

export function* fetchPersonTypes(action) {
  try {
    const data = yield call(API.fetchPersonTypes, action.payload.url);
    yield put({ type: TYPES.SET_PERSON_TYPES, value: data });
  } catch (error) {
    const errors = `Cannot fetch data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* fetchPersons(action) {
  try {
    const data = yield call(API.fetchPersons, action.payload.url);
    yield put({ type: TYPES.SET_PERSONS, value: data });
  } catch (error) {
    const errors = `Cannot fetch persons data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* createPerson(action) {
  try {
    const data = yield call(
      API.createPerson,
      // TODO: need to get rid of apiUrl and use just url field
      { apiUrl: action.payload.url, person: action.payload.person },
    );
    yield put({ type: TYPES.ADD_PERSON, value: data });
  } catch (error) {
    const errors = `Cannot fetch data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* deletePerson(action) {
  try {
    yield call(API.deletePerson, action.payload);
    yield put({ type: TYPES.REMOVE_PERSON, value: action.payload.person });
  } catch (error) {
    const errors = `Cannot delete the person: ${action.payload.person.first_name} due to: ${error}`;
    yield put({ type: TYPES.DELETE_FAILED, errors: [errors] });
  }
}

export function* updatePerson(action) {
  try {
    yield call(
      API.updatePerson,
      action.payload,
    );
    yield put({ type: TYPES.CHANGE_PERSON, value: action.payload.person });
  } catch (error) {
    const errors = `Cannot update the person record ${action.payload.pirson.first_name} due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* createTask(action) {
  try {
    const data = yield call(
      API.createTask,
      { apiUrl: action.payload.url, task: action.payload.task },
    );
    yield put({ type: TYPES.ADD_TASK, value: data });
    // in case project ID is provided, reload the corresponding project
    const projectId = action.payload.task.project_id;
    if (projectId[0]) {
      yield reloadProject({ payload: { url: action.payload.url, id: projectId[0] } });
    }
  } catch (error) {
    const errors = `Cannot create a task ${action.payload.task.title} due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* fetchTasks(action) {
  try {
    const data = yield call(API.fetchTasks, action.payload.url);
    yield put({ type: TYPES.SET_TASKS, value: data });
  } catch (error) {
    const errors = `Cannot fetch task data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* updateTask(action) {
  try {
    yield call(API.updateTask, { ...action.payload });
    yield put({ type: TYPES.CHANGE_TASK, value: action.payload.task });
    const projectId = action.payload.task.project_id;
    if (projectId[0]) {
      yield reloadProject({ payload: { url: action.payload.url, id: projectId[0] } });
    }
  } catch (error) {
    const errors = `Cannot update the task ${action.payload.task.title} due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* deleteTask(action) {
  try {
    yield call(API.deleteTask, action.payload);
    yield put({ type: TYPES.REMOVE_TASK, value: action.payload.task });
  } catch (error) {
    const errors = `Cannot delete the task: ${action.payload.task.title} due to: ${error}`;
    yield put({ type: TYPES.DELETE_FAILED, errors: [errors] });
  }
}


/*

// action: payload: {url, id}
export function* getTask(action) {
  try {
    const data = yield call(API.getTask({ ...action.payload }));
    return data;
  } catch (error) {
    const errors = `Cannot get task: ${action.payload.task.id} due to: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
  return null;
}
*/

export function* fetchNotes(action) {
  try {
    const data = yield call(API.fetchNotes, action.payload.url);
    yield put({ type: TYPES.SET_NOTES, value: data });
  } catch (error) {
    const errors = `Cannot fetch notes data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* createNote(action) {
  try {
    const data = yield call(
      API.createNote,
      { apiUrl: action.payload.url, note: action.payload.note },
    );
    yield put({ type: TYPES.ADD_NOTE, value: data });

    // in case project ID is provided, reload the corresponding project
    const projectId = action.payload.note.project_id;
    if (projectId[0]) {
      yield reloadProject({ payload: { url: action.payload.url, id: projectId[0] } });
    }
  } catch (error) {
    const errors = `Cannot create a note due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* updateNote(action) {
  try {
    const data = yield call(API.updateNote, action.payload);
    yield put({ type: TYPES.CHANGE_NOTE, value: data });
    const projectId = action.payload.note.project_id;
    if (projectId[0]) {
      yield reloadProject({ payload: { url: action.payload.url, id: projectId[0] } });
    }
  } catch (error) {
    const errors = `Cannot update the note due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* deleteNote(action) {
  try {
    yield call(API.deleteNote, action.payload);
    yield put({ type: TYPES.REMOVE_NOTE, value: action.payload.note });
  } catch (error) {
    const errors = `Cannot delete the note: ${action.payload.note.title} due to: ${error}`;
    yield put({ type: TYPES.DELETE_FAILED, errors: [errors] });
  }
}

/*
 ** PROJECTS
 */
export function* fetchProjects(action) {
  try {
    const data = yield call(
      API.fetchProjects,
      action.payload.url,
    );
    yield put({ type: TYPES.SET_PROJECTS, value: data });
  } catch (error) {
    const errors = `Cannot fetch projects data from URL: ${action.payload.url}: ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export function* createProject(action) {
  try {
    const data = yield call(
      API.createProject,
      action.payload,
    );
    yield put({ type: TYPES.ADD_PROJECT, value: data });
  } catch (error) {
    const errors = `Cannot create a project due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, erorrs: [errors] });
  }
}

export function* updateProject(action) {
  try {
    const data = yield call(API.updateProject, action.payload);
    yield put({ type: TYPES.CHANGE_PROJECT, value: data });
  } catch (error) {
    const errors = `Cannot update the project ${action.payload.project.title} due to: ${error}`;
    yield put({ type: TYPES.POST_FAILED, errors: [errors] });
  }
}

export function* deleteProject(action) {
  try {
    yield call(API.deleteProject, action.payload);
    yield put({ type: TYPES.REMOVE_PROJECT, value: action.payload.project });
  } catch (error) {
    const errors = `Cannot delete the project: ${action.payload.project.title} due to: ${error}`;
    yield put({ type: TYPES.DELETE_FAILED, errors: [errors] });
  }
}

export function* reloadProject(action) {
  try {
    console.log("RLD project: ", action.payload.id);
    const data = yield call(API.fetchProject, action.payload);
    yield put({ type: TYPES.CHANGE_PROJECT, value: data });
  } catch (error) {
    const errors = `Cannot reload project woith ID: ${action.payload.id} due to ${error}`;
    yield put({ type: TYPES.FETCH_FAILED, errors: [errors] });
  }
}

export default function* rootSaga() {
  // ------ persons
  yield takeLatest(TYPES.FETCH_PERSON_TYPES, fetchPersonTypes);
  yield takeEvery(TYPES.CREATE_PERSON, createPerson);
  yield takeLatest(TYPES.FETCH_PERSONS, fetchPersons);
  yield takeEvery(TYPES.UPDATE_PERSON, updatePerson);
  yield takeEvery(TYPES.DELETE_PERSON, deletePerson);
  // ------ tasks
  yield takeEvery(TYPES.CREATE_TASK, createTask);
  yield takeLatest(TYPES.FETCH_TASKS, fetchTasks);
  yield takeEvery(TYPES.UPDATE_TASK, updateTask);
  yield takeEvery(TYPES.DELETE_TASK, deleteTask);
  // ------ notes
  yield takeEvery(TYPES.CREATE_NOTE, createNote);
  yield takeLatest(TYPES.FETCH_NOTES, fetchNotes);
  yield takeEvery(TYPES.UPDATE_NOTE, updateNote);
  yield takeEvery(TYPES.DELETE_NOTE, deleteNote);
  // ------ projects
  yield takeLatest(TYPES.FETCH_PROJECTS, fetchProjects);
  yield takeEvery(TYPES.CREATE_PROJECT, createProject);
  yield takeEvery(TYPES.UPDATE_PROJECT, updateProject);
  yield takeEvery(TYPES.DELETE_PROJECT, deleteProject);
  yield takeLatest(TYPES.RELOAD_PROJECT, reloadProject);
}
