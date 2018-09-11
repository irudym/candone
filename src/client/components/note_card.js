import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import Card from './card';
import FollowupButton from './followup_button';

import * as SCHEMAS from '../../lib/schemas';
import colors from '../styles/colors';

const NoteCard = ({
  note,
  onClick,
  onDelete,
  onFollowup,
  selected,
}) => (
  <Card onClick={() => (onClick(note))} selected={selected}>
    <Card.Content onDelete={() => { onDelete(note); }} color={colors.green}>
      <FollowupButton onClick={() => (onFollowup(note))} />
      <Card.Header>
        {note.title}
      </Card.Header>
      <Card.Meta>
        <span className="date">
          {note.created_at}
        </span>
      </Card.Meta>
      <Card.Description>
        <Icon name="users" />
        { note.participants.length}
        <Icon name="star" />
        { note.actions.length}
      </Card.Description>
    </Card.Content>
  </Card>
);

NoteCard.propTypes = {
  note: PropTypes.shape(SCHEMAS.note).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFollowup: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

NoteCard.defaultProps = {
  selected: false,
};

export default NoteCard;
