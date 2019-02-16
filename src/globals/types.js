export const ADD_PERSON = 'PERSON/ADD'; // add person record to local state
export const SET_PERSONS = 'PERSONS/SET'; // set the whole person array
export const CHANGE_PERSON = 'PERSONS/CHANGE'; // just another name of Update as Update word is used in SAGA action
export const REMOVE_PERSON = 'PERSONS/REMOVE';

export const ADD_TASK = 'TASKS/ADD';
export const SET_TASKS = 'TASKS/SET';
export const CHANGE_TASK = 'TASKS/CHANGE';
export const REMOVE_TASK = 'TASKS/REMOVE'; // remove task from state (redux)
export const HIDE_COMPLETE_TASKS = 'TASKS/HIDE_COMPLETE'; // hide complete tasks in dashboard view


export const ADD_NOTE = 'NOTES/ADD';
export const SET_NOTES = 'NOTES/SET';
export const CHANGE_NOTE = 'NOTES/CHANGE';
export const REMOVE_NOTE = 'NOTES/REMOVE'; // redu action to remove a note from the state

/*
 * PROJECT ACTIONS
 */
export const ADD_PROJECT = 'PROJECTS/ADD';
export const SET_PROJECTS = 'PROJECTS/SET';
export const CHANGE_PROJECT = 'PROJECTS/CHANGE';
export const REMOVE_PROJECT = 'PROJECTS/REMOVE';
export const SET_CURRENT_PROJECT = 'PROJECTS/SET_CURRENT';
export const ADD_NOTE_TO_PROJECT = 'PROJECTS/ADD_NOTE';

// Saga actions PROJECTS
export const FETCH_PROJECTS = 'PROJECTS/FETCH';
export const CREATE_PROJECT = 'PROJECTS/CREATE';
export const UPDATE_PROJECT = 'PROJECTS/UPDATE';
export const DELETE_PROJECT = 'PROJECTS/DELETE';
export const RELOAD_PROJECT = 'PROJECTS/RELOAD';

export const SET_PERSON_TYPES = 'PERSON_TYPES/SET'; // set the whole person_types array in redux state

// Saga action TYPES
export const FETCH_PERSON_TYPES = 'PERSON_TYPES/FETCH';

// Saga actions PERSONS
export const FETCH_PERSONS = 'PERSONS/FETCH'; // get person records from DB
export const CREATE_PERSON = 'PERSONS/CREATE'; // create a person on remote server by API call
export const UPDATE_PERSON = 'PERSONS/UPDATE';
export const DELETE_PERSON = 'PERSON/DELETE';

// Saga action TASKS
export const FETCH_TASKS = 'TASKS/FETCH'; // get all tasks from a server
export const CREATE_TASK = 'TASKS/CREATE';
export const UPDATE_TASK = 'TASKS/UPDATE';
export const DELETE_TASK = 'TASKS/DELETE'; // delete a task from s server (SAGA action)

// Saga actions NOTES
export const FETCH_NOTES = 'NOTES/FETCH';
export const CREATE_NOTE = 'NOTES/CREATE';
export const UPDATE_NOTE = 'NOTES/UPDATE';
export const DELETE_NOTE = 'NOTES/DELETE';

// Errors handling actions
export const FETCH_FAILED = 'FETCH/ERROR';
export const POST_FAILED = 'POST/ERROR';
export const DELETE_FAILED = 'DELETE/ERROR';
