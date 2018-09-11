import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

import Card from './card';
import * as SCHEMAS from '../../lib/schemas';

import colors from '../styles/colors';

const PersonCard = ({
  person,
  onClick,
  onDelete,
  selected,
}) => (
  <Card onClick={() => onClick(person)} selected={selected}>
    <Card.Content onDelete={() => { onDelete(person); }} color={colors.blue}>
      <Card.Header>
        {`${person.first_name} ${person.last_name}`}
      </Card.Header>
      <Card.Meta>
        {person.email}
      </Card.Meta>
      <Card.Description />
    </Card.Content>
  </Card>
);

PersonCard.propTypes = {
  person: PropTypes.shape(SCHEMAS.person).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  selected: PropTypes.bool,
};

PersonCard.defaultProps = {
  onDelete: null,
  selected: false,
};

export default PersonCard;
