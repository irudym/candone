import React from 'react';
import PropTypes from 'prop-types';
import NoteCard from './note_card';


const NotesHolder = ({ notes, onClick, onDelete }) => (
  <div>
    { notes.map(note => (
      <NoteCard key={note.id} note={note} onClick={onClick} onDelete={onDelete} />
    ))}
  </div>
);

NotesHolder.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NotesHolder;
