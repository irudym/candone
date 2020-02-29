import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';

import { updateNote, deleteNote } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

import NoteView from '../components/views/note';
import * as SCHEMAS from '../../lib/schemas';

import { getTodayDate } from '../../lib/utils';

const markdownReplaces = (markdown) => {
  if (!markdown) return '';
  // replace [today] markups
    // eslint-disable-next-line camelcase
    let new_markdown = markdown.replace(/\[today\]/g, getTodayDate());

    // replace [f: ] markups
    // eslint-disable-next-line camelcase
    try {
      new_markdown = new_markdown.replace(/\[f:(.*?):f\]/g, (str) => {
        return eval(str.replace(/\[f:|:f\]/g, ''));
      });
    } catch(error) {
      // no worries, we don't care about eval errors
    }
    return new_markdown;
} 

class EditNote extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('NEW NOTE PROPS: ', nextProps);
    if (nextProps.note && nextProps.note.id !== prevState.note.id) {
      return ({
        note: {
          ...nextProps.note,
          markdown: markdownReplaces(nextProps.note.markdown),
        },
      });
    }
    return null;
  }

  state = {
    note: {
      id: null,
      markdown: null,
      participants: [],
      actions: [],
      title: '',
    },
    errors: [],
    showAddAction: false,
    action: {},
    preview: true,
    textInput: null,
  }

  handleClose = () => {
    // TODO: probably need to clear all note fields
    this.setState({
      errors: [],
      showAddAction: false,
      preview: true,
    });
    this.props.onClose();
  }

  handleNoteChange = (e) => {
    const { target: { value } } = e;
    this.setState({
      note: {
        ...this.state.note,
        markdown: markdownReplaces(value),
      },
    });
  }

  handleShowAddAction = () => {
    this.setState({
      showAddAction: true,
      action: { id: shortid.generate() },
    });
  }

  handleCloseAddAction = () => {
    this.setState({
      showAddAction: false,
      action: {},
    });
  }

  handleActionTextChange = (e) => {
    this.setState({
      action: {
        ...this.state.action,
        title: e.target.value,
      },
    });
  }

  handleAddAction = () => {
    console.log('Add action: ', this.state.action);
    this.setState({
      note: {
        ...this.state.note,
        actions: [
          ...this.state.note.actions,
          this.state.action,
        ],
      },
    });
    this.handleCloseAddAction();
  }

  handleDeleteAction = (id) => {
    const actions = this.state.note.actions.filter((action) => {
      if (action.id !== id) return action;
      return null;
    });
    this.setState({
      note: {
        ...this.state.note,
        actions,
      },
    });
  }

  handleParticipantsChange = (e, { value }) => {
    this.setState({
      note: {
        ...this.state.note,
        participants: [...value],
      },
    });
  }

  handleActionOwnerChange = (e, { value }) => {
    this.setState({
      action: {
        person_ids: [...value],
      },
    });
  }

  validates = () => {
    // TODO: Implement validation method
    return [];
  }

  handleUpdate = () => {
    const errors = this.validates();
    if (errors.length !== 0) {
      this.setState({
        errors,
      });
      return;
    }
    // call action
    const { note } = this.state;

    this.props.updateNote({
      url: serverUrl,
      note: { ...note, markdown: markdownReplaces(note.markdown), project_id: [this.props.projectID] },
    });

    // this.props.onClose();
    this.handleClose();
  }

  handleNoteDelete = () => {
    console.log('Delete note with ID: ', this.state.note.id);
    this.props.deleteNote({
      url: serverUrl,
      note: this.state.note,
    });
    this.props.onClose();
  }

  handleEditNote = () => this.setState({ preview: !this.state.preview });


  render() {
    if (!this.state.note) return null;
    if (!this.props.note) return null;
    const peopleOptions = this.props.persons.map(person => (
      {
        id: 1,
        value: person.id,
        text: `${person.first_name} ${person.last_name}`,
      }
    ));
    return (
      <NoteView
        show={this.props.show}
        onClose={this.handleClose}
        onDelete={this.handleNoteDelete}
        peopleOptions={peopleOptions}
        markdown={this.state.note.markdown}
        onNoteChange={this.handleNoteChange}
        onCloseAddAction={this.handleCloseAddAction}
        onShowAddAction={this.handleShowAddAction}
        showAddAction={this.state.showAddAction}
        onActionTextChange={this.handleActionTextChange}
        onAddAction={this.handleAddAction}
        actions={this.state.note.actions}
        onDeleteAction={this.handleDeleteAction}
        onSubmit={this.handleUpdate}
        onParticipantsChange={this.handleParticipantsChange}
        onActionOwnerChange={this.handleActionOwnerChange}
        note={this.props.note}
        submitTitle="Update"
        viewTitle="Edit the Note"
        preview={this.state.preview}
        onEdit={this.handleEditNote}
      />
    );
  }
}

EditNote.propTypes = {
  note: PropTypes.shape(SCHEMAS.note).isRequired,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  projectID: PropTypes.number,
};

EditNote.defaultProps = {
  projectID: null,
};

const mapStateToProps = state => (
  {
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  updateNote: value => dispatch(updateNote(value)),
  deleteNote: value => dispatch(deleteNote(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
