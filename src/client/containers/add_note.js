import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import NoteView from '../components/views/note';

import { createNote, reloadProject } from '../../redux/actions';
import serverUrl from '../../globals/api_server';


class AddNote extends Component {
  state = {
    markdown: '',
    title: '',
    showAddAction: false,
    actions: [],
    action: {},
    participants: [],
  };

  handleClose = () => {
    this.setState({
      markdown: '',
      showAddAction: false,
    });
    this.props.onClose();
  }

  handleNoteChange = (e) => {
    this.setState({
      markdown: e.target.value,
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
    this.setState({
      actions: [
        ...this.state.actions,
        this.state.action,
      ],
    });
    this.handleCloseAddAction();
  }

  handleDeleteAction = (action) => {
    this.setState({
      actions: this.state.actions.filter(element => element.id !== action.id),
    });
  }

  handleParticipantsChange = (e, { value }) => {
    this.setState({
      participants: [...value],
    });
  }

  handleActionOwnerChange = (e, { value }) => {
    this.setState({
      action: {
        ...this.state.action,
        person_ids: [...value],
      },
    });
  }

  validates = () => {
    // TODO: Implement validation method
    return true;
  }

  handleAddNote = () => {
    // upload data to server
    console.log("Adding Note with following items:");
    console.log("===> actions: ", this.state.actions);
    console.log("===> participants: ", this.state.participants);
    console.log("===> markdown: ", this.state.markdown);
    console.log("====== END ======");

    if (this.validates()) {
      this.props.createNote({
        url: serverUrl,
        note: {
          participants: this.state.participants,
          actions: this.state.actions,
          markdown: this.state.markdown,
          project_id: [this.props.projectID],
        },
      });

      this.handleClose();
    }
  }

  render() {
    const peopleOptions = this.props.persons.map(person => (
      {
        id: person.id,
        value: person.id,
        text: `${person.first_name} ${person.last_name}`,
      }
    ));

    return (
      <NoteView
        show={this.props.show}
        onClose={this.handleClose}
        peopleOptions={peopleOptions}
        markdown={this.state.markdown}
        onNoteChange={this.handleNoteChange}
        onCloseAddAction={this.handleCloseAddAction}
        onShowAddAction={this.handleShowAddAction}
        showAddAction={this.state.showAddAction}
        onActionTextChange={this.handleActionTextChange}
        onAddAction={this.handleAddAction}
        actions={this.state.actions}
        onDeleteAction={this.handleDeleteAction}
        onSubmit={this.handleAddNote}
        onParticipantsChange={this.handleParticipantsChange}
        onActionOwnerChange={this.handleActionOwnerChange}
      />
    );
  }
}

AddNote.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // onAddNote: PropTypes.func.isRequired,
  persons: PropTypes.arrayOf(PropTypes.object).isRequired,
  createNote: PropTypes.func.isRequired,
  projectID: PropTypes.number,
  reloadProject: PropTypes.func.isRequired,
};

AddNote.defaultProps = {
  projectID: null,
};

const mapStateToProps = state => (
  {
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  createNote: value => dispatch(createNote(value)),
  reloadProject: value => dispatch(reloadProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
