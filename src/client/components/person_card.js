import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card, Button } from 'semantic-ui-react';

import * as SCHEMAS from '../../lib/schemas';

const PersonCard = ({ person, onClick, onDelete }) => (
  <Card onClick={e => onClick(person.id)}>
    <Card.Content>
      <Card.Header>
        {`${person.first_name} ${person.last_name}`}
      </Card.Header>
      <Card.Meta>
        [some meta]
      </Card.Meta>
      <Card.Description>
        some description
        <Button icon float="right" onClick={(e) => { e.stopPropagation(); onDelete(person); }} >
          <Icon name="trash" />
        </Button>
      </Card.Description>
    </Card.Content>
  </Card>
);

PersonCard.propTypes = {
  person: PropTypes.shape(SCHEMAS.person).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
};

PersonCard.defaultProps = {
  onDelete: null,
};

export default PersonCard;
