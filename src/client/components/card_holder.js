import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import TaskCard from './task_card';
import colors, { elements } from '../styles/colors';

const holderStyle = {
  background: colors.gray,
  border: `1px solid ${colors.borderGray}`,
  margin: 8,
  padding: '1rem',
};

const borderlessHolderStyle = {
  margin: 8,
  padding: '1rem',
};

const headerStyle = {
  color: elements.title,
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '1.4rem',
  // marginBottom: '-20px',
  margin: '0px 8px',
  padding: '1rem',
};

/**
 * Component to show Task cards in corresponding columns
 * @param {array of Task objects} todoTasks array of Tasks with todo stage
 * @param {array of Task objects} devTasks  array of Tasks with in development stage
 * @param {array of Task objects} doneTasks array of Tasks with done stage
 * @param {func} onClick   handle click on a Task card (usually view/edit the task)
 * @param {func} onDelete  handle task delete
 * @param {bool} fullscreen   show only one row with todoTaks (just pass all task as todoTasks to show them all)
 */
const CardHolder = ({
  todoTasks,
  devTasks,
  doneTasks,
  onClick,
  onDelete,
  fullscreen,
}) => (
  <Grid columns={fullscreen ? '1' : '3'} stackable>
    <Grid.Row>
      <Grid.Column key="1" width={fullscreen ? '8' : '5'}>
        { fullscreen ?
          null
          :
          <div style={headerStyle}>
            Todo
          </div>
        }
        <div style={fullscreen ? borderlessHolderStyle : holderStyle}>
          {todoTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={onClick}
              onDelete={onDelete}
            />
          ))}
        </div>
      </Grid.Column>
      { fullscreen ?
        null
        :
        <React.Fragment>
          <Grid.Column key="2" width="5">
            <div style={headerStyle}>
              Development
            </div>
            <div style={holderStyle}>
              {devTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onClick}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </Grid.Column>
          <Grid.Column key="3" width="5">
            <div style={headerStyle}>
              Done
            </div>
            <div style={holderStyle}>
              {doneTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={onClick}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </Grid.Column>
        </React.Fragment>
      }
    </Grid.Row>
  </Grid>
);

CardHolder.propTypes = {
  todoTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  devTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  doneTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool,
};

CardHolder.defaultProps = {
  fullscreen: false,
};

export default CardHolder;
