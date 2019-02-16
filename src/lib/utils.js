export const first5words = string => string.replace(/(([^\s]+\s\s*){5})(.*)/, '$1…');

export const toOptionsList = (array, toTitle = null) => {
  if (array) {
    return array.map(element => (
      {
        key: element.id,
        value: element.id,
        text: toTitle ? toTitle(element) : element.title,
      }
    ));
  }
  return [];
};

export const toIDList = (array) => {
  if (array) {
    return array.map(element => (element.id));
  }
  return [];
};

const stage2string = (stage) => {
  switch (stage) {
    case 0: return 'ToDo';
    case 1: return 'WIP';
    default: return 'Done';
  }
};

export const createFollowup = (note, tasks, persons) => (
  `#### Actions Review\n---\n${note.actions.map((actionId) => {
    const action = tasks.find(elem => elem.id === actionId.id);
    const actionPersons = action.persons.map(id => (
      // TODO: Need to cache the find request
      `***${persons.find(person => person.id === id).first_name} ${persons.find(person => person.id === id).last_name}***`
    )).join(', ');
    // console.log("FND ACTION: ", action);
    return `${actionPersons} : ${action.title} :: **${stage2string(action.stage)}**`;
  }).join('\n\n')}\n\n---\n`
);

export const getTodayDate = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  return `${dd}/${mm}/${yyyy}`;
};
