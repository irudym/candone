import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddNote from './containers/add_note';
import Header from './components/header';
import CardHolder from './components/card_holder';
import AppContent from './components/app_content';
import AddButton from './components/add_button';
import NotesHolder from './containers/notes_holder';
import EditNote from './containers/edit_note';

import { deleteNote } from '../redux/actions';
import serverUrl from '../globals/api_server';

import * as SCHEMAS from '../lib/schemas';


class Notes extends Component {
  state = {
    showAddNote: false,
    showEditNote: false,
    currentNote: {
      id: -1,
      markdown: null,
      participants: [],
      actions: [],
    },
  };

  handleAddNoteShow = () => {
    this.setState({
      showAddNote: true,
    });
  }

  handleAddNoteClose = () => {
    this.setState({
      showAddNote: false,
    });
  }

  handleNoteClick = (id) => {
    // TODO: pass the note as an argument from NoteCard
    const currentNote = this.props.notes.filter(e => e.id === id)[0];
    if (currentNote) {
      this.setState({
        currentNote,
        showEditNote: true,
      });
    }
  }

  handleEditNoteClose = () => this.setState({ showEditNote: false });

  handleNoteDelete = (note) => {
    this.props.deleteNote({ url: serverUrl, note });
  }

  render() {
    return (
      <AppContent>
        <Header>
          <AddButton onClick={this.handleAddNoteShow} title="Note" />
          <AddNote show={this.state.showAddNote} onClose={this.handleAddNoteClose} />
        </Header>
        <NotesHolder
          onClick={this.handleNoteClick}
          onDelete={this.handleNoteDelete}
        />
        <EditNote
          show={this.state.showEditNote}
          onClose={this.handleEditNoteClose}
          note={this.state.currentNote}
        />
      </AppContent>
    );
  }
};

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)),
  deleteNote: PropTypes.func.isRequired,
}

const mapStateToProps = state => (
  {
    notes: state.notes,
  }
);

const mapDispatchToProps = dispatch => ({
  deleteNote: value => dispatch(deleteNote(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
