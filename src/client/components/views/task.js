/**
 * Universal component to create, edit a task record
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea, Radio, Button } from 'semantic-ui-react';

import * as SCHEMAS from '../../../lib/schemas';
import PeopleSelect from '../people_select';
import StageSelect from '../stage_select';
import Modal from '../modal';
import SubmitButton from '../submit_button';
import CancelButton from '../cancel_button';
import DeleteButton from '../delete_button';

/**
  * Universal component for Add, Edit
  * @param {string} viewTitle           modal dialog title, default value is 'Add a Task'
  * @param {string} urgencyValue        current urgency value
  * @param {number} stageValue          current stage value
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
  * @param {func} onDelete              delete callback, in case not null,
  *                                     button 'Delete' will be shown
  * @param {func} onStageChange         stage change callback, in case null,
  *                                     the option select will no be shown
  */
const Task = ({
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
  onStageChange,
  stageValue,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} onClose={onClose} open={show} title={viewTitle}>
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
        {onStageChange ?
          <StageSelect label="Stage" placeholder="Select a stage" onChange={onStageChange} stage={stageValue} defaultValue={task.stage} />
          :
          ''
        }
      </Form>
    </Modal.Content>
    <Modal.Actions>
      {onDelete ?
        <DeleteButton onClick={onDelete} />
        :
        ''
      }
      <SubmitButton title={submitTitle} onClick={onSubmit} />
      <CancelButton onClick={onClose} />
    </Modal.Actions>
  </Modal>
);

Task.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  urgencyValue: PropTypes.string.isRequired,
  onUrgencyChange: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  onPeopleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  task: PropTypes.shape(SCHEMAS.task),
  viewTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  onDelete: PropTypes.func,
  onStageChange: PropTypes.func,
  stageValue: PropTypes.number.isRequired,
};

Task.defaultProps = {
  viewTitle: 'Add a Task',
  submitTitle: 'Add',
  task: {
    id: null,
    title: null,
    description: null,
    stage: null,
  },
  onDelete: null,
  onStageChange: null,
};

export default Task;
