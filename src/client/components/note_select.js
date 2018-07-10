import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Button, Segment, Icon } from 'semantic-ui-react';

import * as SCHEMAS from '../../lib/schemas';

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
    <div>
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
        <Button color="green" onClick={onAdd}>Add a Note</Button>
      </Form.Group>
      <Segment>
        {notes.map(note => (
          <div>
            <Icon name="file text outline" />
            {note.title}
          </div>
        ))}
      </Segment>
    </div>
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
