import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import TaskCard from './task_card';
import colors, { elements } from '../styles/colors';

const holderStyle = {
  // background: colors.gray,
  backgroundImage: `linear-gradient(45deg, ${colors.borderGray} 3.13%, ${colors.gray} 3.13%, ${colors.gray} 50%, ${colors.borderGray} 50%, ${colors.borderGray} 53.13%, ${colors.gray} 53.13%, ${colors.gray} 100%)`,
  backgroundSize: '22.63px 22.63px',
  border: `1px solid ${colors.borderGray}`,
  margin: 8,
  padding: '1rem',
  height: '100%',
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

const getGridColumns = (fullscreen, hideComplete) => {
  if (fullscreen) return '1';
  if (hideComplete) return '2';
  return '3';
};

const getColumnWidth = (fullscreen, hideComplete) => {
  if (fullscreen || hideComplete) return 7;
  return 5;
};

const getOwners = (ids, people) => {
  console.log("IDS: ", ids);
  console.log('People: ', people);
  return ids ? ids.map(id => people.find(person => person.key === id)) : null;
};

/**
 * Component to show Task cards in corresponding columns
 * @param {array of Task objects} todoTasks array of Tasks with todo stage
 * @param {array of Task objects} devTasks  array of Tasks with in development stage
 * @param {array of Task objects} doneTasks array of Tasks with done stage
 * @param {func} onClick   handle click on a Task card (usually view/edit the task)
 * @param {func} onDelete  handle task delete
 * @param {bool} fullscreen   show only one row with todoTaks (just pass all task as todoTasks to show them all)
 * @param {bool} hideComplete hide Complete column
 * @param {array of Objects} people array with people names and ids
 */
const CardHolder = ({
  todoTasks,
  devTasks,
  doneTasks,
  onClick,
  onDelete,
  fullscreen,
  hideComplete,
  people,
}) => (
  <Grid columns={getGridColumns(fullscreen, hideComplete)} stackable style={{ height: '100%' }}>
    <Grid.Row>
      <Grid.Column key="1" width={getColumnWidth(fullscreen, hideComplete)}>
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
              owners={getOwners(task.persons, people)}
            />
          ))}
        </div>
      </Grid.Column>
      { fullscreen ?
        null
        :
        <React.Fragment>
          <Grid.Column key="2" width={getColumnWidth(fullscreen, hideComplete)}>
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
          {hideComplete ?
            null
            :
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
          }
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
  hideComplete: PropTypes.bool,
  people: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })),
};

CardHolder.defaultProps = {
  fullscreen: false,
  hideComplete: false,
  people: [],
};

export default CardHolder;
