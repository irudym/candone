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
