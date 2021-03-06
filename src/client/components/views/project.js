/*
 * Universal Component to create/edit a project
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea, Button } from 'semantic-ui-react';

import Modal from '../modal'
import SubmitButton from '../submit_button';
import CancelButton from '../cancel_button';
import DeleteButton from '../delete_button';
import TaskSelect from '../task_select';
import NoteSelect from '../note_select';
import PeopleSelect from '../people_select';
import ActionsHolder from '../actions_holder';
import * as SCHEMAS from '../../../lib/schemas';


const Project = ({
  show,
  onClose,
  viewTitle,
  project,
  onTitleChange,
  onDescriptionChange,
  onDelete,
  onSubmit,
  submitTitle,
  tasksOptions,
  peopleOptions,
  notesOptions,
  tasks,
  onTaskSelect,
  onAddTask,
  onDeleteTask,
  onPeopleChange,
  onNoteSelect,
  onDeleteNote,
  notes,
  onAddNote,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} open={show} onClose={onClose} size="large" title={viewTitle}>
    <Modal.Content>
      <Form>
        <Form.Input label="Title" placeholder="Project title" onChange={onTitleChange} defaultValue={project.title} />
        <Form.Field control={TextArea} label="Objectives" placeholder="Project main objectives" onChange={onDescriptionChange} defaultValue={project.description} />
        <PeopleSelect label="Participants" placeholder="Add a participant" peopleOptions={peopleOptions} onChange={onPeopleChange} defaultValue={project.persons} />
        <NoteSelect
          label="Note"
          placeholder="Link a Note to the Project"
          notesOptions={notesOptions}
          onChange={onNoteSelect}
          onAdd={onAddNote}
          notes={notes}
          onDelete={onDeleteNote}
        />
        <ActionsHolder>
          <TaskSelect
            label="Task"
            placeholder="Add A Task to the Project"
            tasksOptions={tasksOptions}
            onChange={onTaskSelect}
            onAdd={onAddTask}
            tasks={tasks}
            onDelete={onDeleteTask}
          />
        </ActionsHolder>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      {onDelete ?
        <DeleteButton onClick={onDelete} />
        :
        ''
      }
      <SubmitButton onClick={onSubmit} title={submitTitle} />
      <CancelButton onClick={onClose} />
    </Modal.Actions>
  </Modal>
);

Project.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  viewTitle: PropTypes.string,
  project: PropTypes.shape(PropTypes.object),
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  submitTitle: PropTypes.string,
  tasksOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)).isRequired,
  onTaskSelect: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  onPeopleChange: PropTypes.func.isRequired,
  notesOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  onNoteSelect: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)).isRequired,
  onAddNote: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

Project.defaultProps = {
  viewTitle: 'Add a Project',
  project: {
    id: null,
    title: null,
    description: null,
  },
  onDelete: null,
  submitTitle: 'Add',
};

export default Project;
