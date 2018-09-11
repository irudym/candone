import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';

import NoteCard from './note_card';

import colors from '../styles/colors';

const cardHolderStyle = {
  background: colors.gray,
  border: `1px solid ${colors.borderGray}`,
  margin: 5,
  padding: '1rem',
};

const noteStyle = {
  border: `1px solid ${colors.borderGray}`,
  margin: 5,
  padding: '1rem',
};

/**
 * Component to show notes cards
 * @param {[array]} notes      Note objects array
 * @param {[func]} onClick    OnClick on Note Card handler, called with note object as a parameter
 * @param {[func]} onDelete   Card Delete handler
 * @param {[string]} markdown   Markdown styled text to preview the note content
 * @param {[number]} selected   ID of selected note
 * @param {[bool]} fullscreen Accomodate all width of the screen and don't show preview panel
 * @param {[shape]} style     Additional CSS styles
 * @param {func} onFollowup   onClick on FolloUp button
 */
const NotesHolder = ({
  notes,
  onClick,
  onDelete,
  markdown,
  selected,
  fullscreen,
  style,
  onFollowup,
}) => (
  <Grid style={style}>
    <Grid.Row>
      <Grid.Column width={fullscreen ? null : 6}>
        <div style={cardHolderStyle}>
          { notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={onClick}
              onDelete={onDelete}
              onFollowup={onFollowup}
              selected={note.id === selected}
            />
          ))}
        </div>
      </Grid.Column>
      {markdown ?
          (
            <Grid.Column width={10}>
              <div style={noteStyle}>
                <ReactMarkdown source={markdown} />
              </div>
            </Grid.Column>
          )
          :
          null
        }
    </Grid.Row>
  </Grid>
);

NotesHolder.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  markdown: PropTypes.string,
  selected: PropTypes.number,
  fullscreen: PropTypes.bool,
  style: PropTypes.object,
};

NotesHolder.defaultProps = {
  markdown: null,
  selected: null,
  fullscreen: false,
  style: {},
};

export default NotesHolder;
