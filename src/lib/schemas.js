/**
 * Description opf data schemas in React style
 */
import PropTypes from 'prop-types';

export const person = {
  id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  description: PropTypes.string,
  email: PropTypes.string,
  person_type_id: PropTypes.number,
};


export const task = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  urgency: PropTypes.number,
  stage: PropTypes.number,
  persons: PropTypes.arrayOf(PropTypes.number),
  created_at: PropTypes.string,
};

export const note = {
  id: PropTypes.number,
  markdown: PropTypes.string,
  created_at: PropTypes.string,
  participants: PropTypes.arrayOf(PropTypes.number),
  actions: PropTypes.arrayOf(PropTypes.object),
};

export const project = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  stage: PropTypes.number,
  notes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.number),
  persons: PropTypes.arrayOf(PropTypes.number),
};

export const option = {
  key: PropTypes.number,
  value: PropTypes.number,
  text: PropTypes.string,
};
