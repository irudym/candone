import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card, Button } from 'semantic-ui-react';

import * as SCHEMAS from '../../lib/schemas';
import { first5words } from '../../lib/utils';


const NoteCard = ({ note, onClick, onDelete }) => (
  <Card onClick={() => (onClick(note.id))}>
    <Card.Content>
      <Card.Header>
        { note.title }
      </Card.Header>
      <Card.Meta>
        <span className="date">
          Created in {note.created_at}
        </span>
      </Card.Meta>
      <Card.Description>
        <Icon name="users" />
        { note.participants.length}
        <Icon name="star" />
        { note.actions.length}
        <Button icon float="right" onClick={(e) => { e.stopPropagation(); onDelete(note); }} >
          <Icon name="trash" />
        </Button>
      </Card.Description>
    </Card.Content>
  </Card>
);

NoteCard.propTypes = {
  note: PropTypes.shape(SCHEMAS.note).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteCard;
