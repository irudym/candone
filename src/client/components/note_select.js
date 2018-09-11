import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Button, Segment, Icon, Message } from 'semantic-ui-react';

import NotesHolder from './notes_holder';
import AddButton from './add_button';
import * as SCHEMAS from '../../lib/schemas';
import colors, { elements } from '../styles/colors';

const blockStyle = {
  background: elements.header,
};

const addButtonStyle = {
  marginLeft: '16px',
};

const cardHolder = {
  background: 'white',
  margin: '20px 0 12px 0',
  borderRadius: 3,
  border: `1px solid ${colors.borderGray}`,
};

const NoteSelect = ({
  placeholder,
  notesOptions,
  label,
  onChange,
  onAdd,
  defaultValue,
  notes,
  onDelete,
}) => {
  // exclude selected *notes* from notesOptions
  const options = notesOptions.filter(opt => (
    !notes.reduce((acc, val) => acc || (val.id === opt.key), false)
  ));
  return (
    <Message style={blockStyle}>
      <Form.Group inline>
        <label>{label}</label>
        <Dropdown
          placeholder={placeholder}
          fluid
          search
          selection
          options={options}
          onChange={onChange}
          defaultValue={defaultValue}
        />
        <AddButton onClick={onAdd} title="Note" style={addButtonStyle} noicon />
      </Form.Group>
      <NotesHolder notes={notes} fullscreen onDelete={onDelete} />
    </Message>
  );
};


NoteSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  notesOptions: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.option)).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
  onAdd: PropTypes.func.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)).isRequired,
  onDelete: PropTypes.func.isRequired,
};

NoteSelect.defaultProps = {
  defaultValue: null,
};

export default NoteSelect;
