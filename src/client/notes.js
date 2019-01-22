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
import { getNote } from '../lib/api';

import * as SCHEMAS from '../lib/schemas';

const constructMarkdown = (participants, actions, markdown, persons) => {
  const participantsMd = participants.map((person) => {
    const name = persons.find(e => e.id === person);
    if (name) return `${name.first_name} ${name.last_name}`;
    return '';
  }).join(', ');
  let actionsMd = actions.map(action => (
    `${action.owners.map((person) => {
      const name = persons.find(e => e.id === person);
      if (name) return `**${name.first_name} ${name.last_name}**`;
      return '**All**';
    })} : ${action.title}`
  )).join('\n- ');
  if (actionsMd.length === 0) actionsMd = 'No actions';
  return `#### Participants: ${participantsMd}\n---\n${markdown}\n---\n#### Actions:\n- ${actionsMd}`;
};


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
    markdown: null,
    selected: null,
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

  handleNoteClick = (note) => {
    // TODO: pass the note as an argument from NoteCard
    const selectedNote = this.props.notes.find(e => e.id === note.id);

    if (selectedNote) {
      // in case of the second click on the note show the edit window
      if (selectedNote.id === this.state.currentNote.id) {
        this.setState({
          showEditNote: true,
        });
        return;
      }
      // load the note from API server
      getNote({ url: serverUrl, id: note.id }).then((currentNote) => {
        // if this is the first click, just show the markdown text of the seleected note
        const markdown = constructMarkdown(
          currentNote.participants,
          currentNote.actions,
          currentNote.markdown,
          this.props.persons,
        );
        this.setState({
          currentNote,
          markdown,
          selected: currentNote.id,
        });
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
        <Header title="Notes">
          <AddButton onClick={this.handleAddNoteShow} title="Note" />
          <AddNote show={this.state.showAddNote} onClose={this.handleAddNoteClose} />
        </Header>
        <NotesHolder
          onClick={this.handleNoteClick}
          onDelete={this.handleNoteDelete}
          markdown={this.state.markdown}
          selected={this.state.selected}
        />
        <EditNote
          show={this.state.showEditNote}
          onClose={this.handleEditNoteClose}
          note={this.state.currentNote}
        />
      </AppContent>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)).isRequired,
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    notes: state.notes,
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  deleteNote: value => dispatch(deleteNote(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
