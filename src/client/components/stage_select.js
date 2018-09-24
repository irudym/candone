import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form, Radio } from 'semantic-ui-react';

const StageSelect = ({
  label,
  onChange,
  stage,
}) => (
  <Form.Group inline>
    <label>{label}</label>
    <Form.Field control={Radio} label="ToDo" value="0" checked={stage.toString() === '0'} onChange={onChange} />
    <Form.Field control={Radio} label="In Development" value="1" checked={stage.toString() === '1'} onChange={onChange} />
    <Form.Field control={Radio} label="Done" value="2" checked={stage.toString() === '2'} onChange={onChange} />
  </Form.Group>
);

StageSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  stage: PropTypes.number.isRequired,
};

export default StageSelect;
