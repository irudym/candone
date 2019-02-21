/**
 * Universal component to create, edit a note
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, TextArea, Button } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import * as SCHEMAS from '../../../lib/schemas';
import PeopleSelect from '../people_select';
import ActionsHolder from '../actions_holder';
import AddButton from '../add_button';
import AddAction from '../add_action';
import EditButton from '../edit_button';
import Modal from '../modal';
import SubmitButton from '../submit_button';
import CancelButton from '../cancel_button';
import DeleteButton from '../delete_button';
import CardHolder from '../card_holder';

import colors, { elements } from '../../styles/colors';

// import { toIDList } from '../../../lib/utils';

const actionsBlockStyle = {
  background: colors.gray,
  border: `1px solid ${colors.borderGray}`,
  marginBottom: 15,
  borderRadius: 3,
};

const headerStyle = {
  padding: '1rem 0',
  color: elements.title,
};

const Actions = ({ actions, onDelete, people }) => {
  if (actions.length === 0) return null;
  return (
    <div style={actionsBlockStyle}>
      <CardHolder fullscreen todoTasks={actions} onDelete={onDelete} onClick={() => {}} />
    </div>
  );
};

Actions.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
};

const Note = ({
  viewTitle,
  show,
  onClose,
  onSubmit,
  submitTitle,
  peopleOptions,
  markdown,
  onNoteChange,
  showAddAction,
  onAddAction,
  onCloseAddAction,
  onShowAddAction,
  onActionTextChange,
  actions,
  onDeleteAction,
  onParticipantsChange,
  onActionOwnerChange,
  onDelete,
  note,
  preview,
  onEdit,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} open={show} onClose={onClose} size="large" title={viewTitle} >
    <Modal.Content>
      <Form>
        <PeopleSelect
          label="Participants"
          placeholder="Select participants or interested people..."
          peopleOptions={peopleOptions}
          onChange={onParticipantsChange}
          defaultValue={note.participants}
        />
      </Form>
      <Grid columns={preview ? '1' : '2'} stackable>
        <Grid.Row>
          {preview ?
          null :
          (
            <Grid.Column key={1} width="8">
              <div style={headerStyle}>
                Note
              </div>
              <Form style={{ height: '100%', paddingBottom: 30 }}>
                <TextArea
                  onChange={onNoteChange}
                  placeholder="Type a note on markdown markup"
                  style={{ minHeight: 200, height: '100%' }}
                  defaultValue={note.markdown}
                  autoFocus
                />
              </Form>
            </Grid.Column>
          )}
          <Grid.Column key={2} width="8">
            <div style={headerStyle}>
              {preview ? (
                  <EditButton onClick={onEdit} title="Edit note" />
                )
                : 
                'Preview'
              }
            </div>
            <div style={{ overflowX: 'hidden' }} onDoubleClick={onEdit}>
              <ReactMarkdown source={markdown} />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ActionsHolder>
        <Actions actions={actions} onDelete={onDeleteAction} people={peopleOptions} />
        <AddAction
          peopleOptions={peopleOptions}
          show={showAddAction}
          onCancel={onCloseAddAction}
          onAdd={onAddAction}
          onTextChange={onActionTextChange}
          onOwnerChange={onActionOwnerChange}
        />
        {showAddAction ? null : <AddButton title="action" onClick={onShowAddAction} />}
      </ActionsHolder>
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

Note.propTypes = {
  show: PropTypes.bool.isRequired,
  showAddAction: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onAddAction: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  markdown: PropTypes.string,
  onNoteChange: PropTypes.func.isRequired,
  onCloseAddAction: PropTypes.func.isRequired,
  onShowAddAction: PropTypes.func.isRequired,
  onActionTextChange: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteAction: PropTypes.func.isRequired,
  onParticipantsChange: PropTypes.func.isRequired,
  onActionOwnerChange: PropTypes.func.isRequired,
  viewTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  onDelete: PropTypes.func,
  note: PropTypes.shape(SCHEMAS.note),
  preview: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
};

Note.defaultProps = {
  viewTitle: 'Add a Note',
  submitTitle: 'Add',
  onDelete: null,
  note: {
    id: null,
    markdown: null,
    created_at: null,
    participants: null,
    actions: null,
  },
  markdown: '',
  preview: false,
};

export default Note;
