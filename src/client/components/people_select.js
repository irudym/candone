import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

const labelStyle = {
  fontSize: '1rem',
  fontWeight: 400,
};

const PeopleSelect = ({
  placeholder,
  peopleOptions,
  label,
  onChange,
  defaultValue,
}) => (
  <Form.Group inline>
    <label style={labelStyle}>{label}</label>
    <Dropdown
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={peopleOptions}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </Form.Group>
);

PeopleSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
};

PeopleSelect.defaultProps = {
  defaultValue: null,
};

export default PeopleSelect;
