/**
 * candone-core API library
 *
 * set of functions to access candone-core API
 */

/**
 * PersonTypes
 */
export const fetchPersonTypes = async (apiUrl) => {
  const response = await fetch(`${apiUrl}/person_types`, {
    method: 'GET',
    // mode: 'cors',
  });
  const data = await response.json();
  return data;
};


/**
 * Persons
 */
export const fetchPersons = async (apiUrl) => {
  const response = await fetch(`${apiUrl}/persons`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const createPerson = async ({ apiUrl, person }) => {
  const response = await fetch(`${apiUrl}/persons`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  const data = await response.json();
  return data;
};

export const updatePerson = async ({ url, person }) => {
  const response = await fetch(`${url}/persons/${person.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  // const data = await response.json();
  return response;
};

export const deletePerson = async ({ url, person }) => {
  const response = await fetch(`${url}/persons/${person.id}`, {
    method: 'DELETE',
  });
  return response;
};


/**
 * Tasks
 */
export const createTask = async ({ apiUrl, task }) => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...task }),
  });
  const data = await response.json();
  return data;
};

export const fetchTasks = async (apiUrl) => {
  const response = await fetch(`${apiUrl}/tasks`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const updateTask = async ({ url, task }) => {
  const response = await fetch(`${url}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  // const data = await response.json();
  return response;
};

export const deleteTask = async ({ url, task }) => {
  const response = await fetch(`${url}/tasks/${task.id}`, {
    method: 'DELETE',
    // TODO: the code below is not necessary
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const getTask = async ({ url, id }) => {
  const response = await fetch(`${url}/tasks/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

/**
 * Notes
 */
export const fetchNotes = async (apiUrl) => {
  const response = await fetch(`${apiUrl}/notes`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const createNote = async ({ apiUrl, note }) => {
  const response = await fetch(`${apiUrl}/notes`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...note }),
  });
  const data = await response.json();
  return data;
};

export const updateNote = async ({ url, note }) => {
  const response = await fetch(`${url}/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  const data = await response.json();
  return data;
};

export const deleteNote = async ({ url, note }) => {
  const response = await fetch(`${url}/notes/${note.id}`, {
    method: 'DELETE',
  });
  return response;
};

export const getNote = async ({ url, id }) => {
  const response = await fetch(`${url}/notes/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

/**
 * Projects
 */
export const fetchProjects = async (apiUrl) => {
  const response = await fetch(`${apiUrl}/projects`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const fetchProject = async ({ url, id }) => {
  const response = await fetch(`${url}/projects/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};

export const createProject = async ({ url, project }) => {
  const response = await fetch(`${url}/projects`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...project }),
  });
  const data = await response.json();
  return data;
};

export const updateProject = async ({ url, project }) => {
  const response = await fetch(`${url}/projects/${project.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  });
  const data = await response.json();
  return data;
};

export const deleteProject = async ({ url, project }) => {
  const response = await fetch(`${url}/projects/${project.id}`, {
    method: 'DELETE',
  });
  return response;
};


export const fetchTaskAnalytics = async ({ url, weeks }) => {
  const response = await fetch(`${url}/tasks/analytic`, {
    method: 'GET',
  });
  const data = await response.json();
  return data;
};
