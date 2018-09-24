import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Card from './card';


import * as SCHEMAS from '../../lib/schemas';
import colors from '../styles/colors';

const urgencyColors = [colors.darkGray, colors.green, colors.orange, colors.red];

const TaskCard = ({
  task,
  onClick,
  onDelete,
}) => (
  <Card onClick={() => onClick(task)}>
    <Card.Content color={urgencyColors[task.urgency]} onDelete={() => { onDelete(task); }}>
      <Card.Header>
        {task.title}
      </Card.Header>
      <Card.Meta>
        <span className="date">
          {task.created_at}
        </span>
      </Card.Meta>
      <Card.Description>
        <ReactMarkdown source={task.description} />
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
