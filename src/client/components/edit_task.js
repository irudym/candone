// DEPRECATED
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, TextArea, Radio, Dropdown, Button } from 'semantic-ui-react';

import PeopleSelect from './people_select';

/**
 * Universal component for Add, Edit
 * @param {string} viewTitle           modal dialog title, default value is 'Add a Task'
 * @param {string} urgencyValue        current urgency value
 * @param {array} peopleOptions        [description]
 * @param {func} onClose               dialog close handler
 * @param {bool} show                  show or hide the modal dialog
 * @param {func} onTitleChange       [description]
 * @param {func} onDescriptionChange [description]
 * @param {func} onUrgencyChange     [description]
 * @param {func} onPeopleChange      [description]
 * @param {func} onSubmit              form submit handler
 * @param {string} submitTitle         submit button title, default value is 'Add'
 * @param {object} task                task json object
 * @param {func} onDelete              delete callback, in case not null, button 'Delete' will be shown
 */
const EditTask = ({
  viewTitle,
  urgencyValue,
  peopleOptions,
  onClose,
  show,
  onTitleChange,
  onDescriptionChange,
  onUrgencyChange,
  onPeopleChange,
  onSubmit,
  submitTitle,
  task,
  onDelete,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} onClose={onClose} open={show} >
    <Modal.Header>{viewTitle}</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Input label="Title" placeholder="Task title" onChange={onTitleChange} defaultValue={task.title} />
        <Form.Field control={TextArea} label="Description" placeholder="Task description" onChange={onDescriptionChange} defaultValue={task.description} />
        <Form.Group inline>
          <label>Urgency</label>
          <Form.Field control={Radio} label="None" value="0" checked={urgencyValue === '0'} onChange={onUrgencyChange} />
          <Form.Field control={Radio} label="Low" value="1" checked={urgencyValue === '1'} onChange={onUrgencyChange} />
          <Form.Field control={Radio} label="Medium" value="2" checked={urgencyValue === '2'} onChange={onUrgencyChange} />
          <Form.Field control={Radio} label="High" value="3" checked={urgencyValue === '3'} onChange={onUrgencyChange} />
        </Form.Group>
        <PeopleSelect label="People" placeholder="Add a person" peopleOptions={peopleOptions} onChange={onPeopleChange} defaultValue={task.persons} />
      </Form>
    </Modal.Content>
    <Modal.Actions>
      {onDelete ?
        <Button floated="left" onClick={onDelete} color="red">Delete</Button>
        :
        ''
      }
      <Button color="blue" onClick={onSubmit} >
        {submitTitle}
      </Button>
      <Button onClick={onClose} >
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

EditTask.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  urgencyValue: PropTypes.string.isRequired,
  onUrgencyChange: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  onPeopleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    urgency: PropTypes.number,
    stage: PropTypes.number,
    person: PropTypes.arrayOf(PropTypes.number),
  }),
  viewTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  onDelete: PropTypes.func,
};

EditTask.defaultProps = {
  viewTitle: 'Add a Task',
  submitTitle: 'Add',
  task: {
    id: null,
    title: null,
    description: null,
  },
  onDelete: null,
};

export default EditTask;
