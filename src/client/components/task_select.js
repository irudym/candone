import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Button, Message } from 'semantic-ui-react';
import CardHolder from './card_holder';

import AddButton from './add_button';
import * as SCHEMAS from '../../lib/schemas';
import colors, { elements } from '../styles/colors';

const blockStyle = {
  background: elements.header,
};

const addButtonStyle = {
  marginLeft: '16px',
};

const cardHolder = {
  background: 'white',
  margin: '20px 0 12px 0',
  borderRadius: 3,
  border: `1px solid ${colors.borderGray}`,
};

const TaskSelect = ({
  placeholder,
  tasksOptions,
  label,
  onChange,
  defaultValue,
  tasks,
  onAdd,
  onDelete,
}) => {
  // create groups
  const todoTasks = [];
  const devTasks = [];
  const doneTasks = [];

  // fill corersponding arrays with tasks
  if (tasks) {
    tasks.map((task) => {
      switch (task.stage) {
        case 0: todoTasks.push(task); break;
        case 1: devTasks.push(task); break;
        default: doneTasks.push(task);
      }
    });
  }

  // exclude selected *tasks* from tasksOptions
  const options = tasksOptions.filter(opt => (
    !tasks.reduce((acc, val) => acc || (val.id === opt.key), false)
  ));

  return (
    <Message style={blockStyle}>
      <Form.Group inline>
        <label>{label}</label>
        <Dropdown
          placeholder={placeholder}
          fluid
          search
          selection
          options={options}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        <AddButton onClick={onAdd} title="Task" style={addButtonStyle} noicon />
      </Form.Group>
      <div style={cardHolder}>
        <CardHolder
          todoTasks={todoTasks}
          devTasks={devTasks}
          doneTasks={doneTasks}
          onClick={() => {}}
          onDelete={onDelete}
        />
      </div>
    </Message>
  );
};

TaskSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  tasksOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)),
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

TaskSelect.defaultProps = {
  defaultValue: null,
  tasks: [],
};

export default TaskSelect;
