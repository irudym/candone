import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import TaskCard from './task_card';
import colors from '../styles/colors';

const holderStyle = {
  background: colors.gray,
};

const Header = () => (
  <Grid.Row>
    <Grid.Column key="1" width="5">
      Todo
    </Grid.Column>
    <Grid.Column key="2" width="5">
      Development
    </Grid.Column>
    <Grid.Column key="3" width="5">
      Done
    </Grid.Column>
  </Grid.Row>
);

/**
 * Component to show Task cards in corresponding columns
 * @param {array of Task objects} todoTasks array of Tasks with todo stage
 * @param {array of Task objects} devTasks  array of Tasks with in development stage
 * @param {array of Task objects} doneTasks array of Tasks with done stage
 * @param {func} onClick   handle click on a Task card (usually view/edit the task)
 * @param {func} onDelete  handle task delete
 */
const CardHolder = ({
  todoTasks,
  devTasks,
  doneTasks,
  onClick,
  onDelete,
}) => (
  <Grid columns="3" stackable>
    <Header />
    <Grid.Row>
      <Grid.Column key="1" width="5" style={holderStyle}>
        {todoTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onClick}
            onDelete={onDelete}
          />
        ))}
      </Grid.Column>
      <Grid.Column key="2" width="5" style={holderStyle}>
        {devTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onClick}
            onDelete={onDelete}
          />
        ))}
      </Grid.Column>
      <Grid.Column key="3" width="5" style={holderStyle}>
        {doneTasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onClick}
            onDelete={onDelete}
          />
        ))}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

CardHolder.propTypes = {
  todoTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  devTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  doneTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardHolder;
