import React from 'react';
import PropTypes from 'prop-types';
import { Card, Label, Button, Icon } from 'semantic-ui-react';

import * as SCHEMAS from '../../lib/schemas';

const urgencyColors = ['grey', 'green', 'yellow', 'red'];

const TaskCard = ({
  task,
  onClick,
  onDelete,
}) => (
  <Card onClick={() => onClick(task)}>
    <Card.Content>
      <Card.Header>
        <Label circular color={urgencyColors[task.urgency]} empty />
        {task.title}
      </Card.Header>
      <Card.Meta>
        <span className="date">
          Created in {task.created_at}
        </span>
      </Card.Meta>
      <Card.Description>
        {task.descriptions}
        <Button icon float="right" onClick={(e) => { e.stopPropagation(); onDelete(task); }} >
          <Icon name="trash" />
        </Button>
      </Card.Description>
    </Card.Content>
  </Card>
);

TaskCard.propTypes = {
  task: PropTypes.shape(SCHEMAS.task).isRequired,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

TaskCard.defaultProps = {
  onClick: null,
  onDelete: null,
};

export default TaskCard;
