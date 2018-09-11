import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';


import PersonCard from './person_card';
import PersonDescription from './person_description';

import colors from '../styles/colors';
import * as SCHEMAS from '../../lib/schemas';

const cardHolderStyle = {
  background: colors.gray,
  border: `1px solid ${colors.borderGray}`,
  margin: 5,
  padding: '1rem',
};

const viewStyle = {
  border: `1px solid ${colors.borderGray}`,
  margin: 5,
  padding: '1rem',
};

const PeopleHolder = ({
  people,
  onClick,
  onDelete,
  style,
  selected,
  person,
}) => (
  <Grid style={style}>
    <Grid.Row>
      <Grid.Column width={6}>
        <div style={cardHolderStyle}>
          { people.map(person => (
            <PersonCard
              key={person.id}
              person={person}
              onClick={onClick}
              onDelete={onDelete}
              selected={person.id === selected}
            />
          ))}
        </div>
      </Grid.Column>
      <Grid.Column width={10}>
        <div style={viewStyle}>
          <PersonDescription person={person} />
        </div>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

PeopleHolder.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  style: PropTypes.object,
  selected: PropTypes.number,
  person: PropTypes.shape(SCHEMAS.person),
};

PeopleHolder.defaultProps = {
  style: {},
  selected: null,
  person: null,
};

export default PeopleHolder;
