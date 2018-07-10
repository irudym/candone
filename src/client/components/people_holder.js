import React from 'react';
import PropTypes from 'prop-types';
import PersonCard from './person_card';

import * as SCHEMAS from '../../lib/schemas';


const PeopleHolder = ({ people, onClick, onDelete }) => (
  <div>
    { people.map(person => (
      <PersonCard key={person.id} person={person} onClick={onClick} onDelete={onDelete} />
    ))}
  </div>
);

PeopleHolder.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PeopleHolder;
