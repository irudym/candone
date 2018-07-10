// DEPRECATED
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Grid, TextArea, Button } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import shortid from 'shortid';

import PeopleSelect from './people_select';
import ActionsHolder from './actions_holder';
import AddButton from './add_button';
import AddAction from './add_action';
import ActionsList from './actions_list';

const EditNote = ({
  viewTitle,
  show,
  onClose,
  onAdd,
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
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} open={show} onClose={onClose} size="large" >
    <Modal.Header>{viewTitle}</Modal.Header>
    <Modal.Content>
      <Form>
        <PeopleSelect
          label="Participants"
          placeholder="Select participants of interested people..."
          peopleOptions={peopleOptions}
          onChange={onParticipantsChange}
        />
      </Form>
      <Grid columns="2" stackable>
        <Grid.Row>
          <Grid.Column key={1} width="8">
            Note
            <Form>
              <TextArea onChange={onNoteChange} placeholder="Type a note on markdown markup" style={{ minHeight: 200 }} />
            </Form>
          </Grid.Column>
          <Grid.Column key={2} width="8">
            Preview
            <ReactMarkdown source={markdown} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ActionsHolder>
        <ActionsList actions={actions} onDelete={onDeleteAction} />
        <AddAction
          peopleOptions={peopleOptions}
          show={showAddAction}
          onCancel={onCloseAddAction}
          onAdd={onAddAction}
          onTextChange={onActionTextChange}
          onOwnerChange={onActionOwnerChange}
        />
        <AddButton title="action" onClick={onShowAddAction} />
      </ActionsHolder>
    </Modal.Content>
    <Modal.Actions>
      <Button color="blue" onClick={onAdd} >
        Add
      </Button>
      <Button onClick={onClose} >
        Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

EditNote.propTypes = {
  show: PropTypes.bool.isRequired,
  showAddAction: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onAddAction: PropTypes.func.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  markdown: PropTypes.string.isRequired,
  onNoteChange: PropTypes.func.isRequired,
  onCloseAddAction: PropTypes.func.isRequired,
  onShowAddAction: PropTypes.func.isRequired,
  onActionTextChange: PropTypes.func.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteAction: PropTypes.func.isRequired,
  onParticipantsChange: PropTypes.func.isRequired,
  onActionOwnerChange: PropTypes.func.isRequired,
  viewTitle: PropTypes.string,
};

EditNote.defaultProps = {
  viewTitle: 'Add a Note',
};

export default EditNote;
