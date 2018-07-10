import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';

const defaultStages = [
  {
    key: 100,
    value: 0,
    text: 'To Do',
  },
  {
    key: 101,
    value: 1,
    text: 'In Development',
  },
  {
    key: 102,
    value: 2,
    text: 'Done',
  },
];

const StageSelect = ({
  placeholder,
  stageOptions,
  label,
  onChange,
  defaultValue,
}) => (
  <Form.Group inline>
    <label>{label}</label>
    <Dropdown
      placeholder={placeholder}
      fluid
      search
      selection
      options={stageOptions}
      onChange={onChange}
      defaultValue={defaultValue}
    />
  </Form.Group>
);

StageSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  stageOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.number,
    text: PropTypes.string,
  })),
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(PropTypes.number),
};

StageSelect.defaultProps = {
  defaultValue: null,
  stageOptions: defaultStages,
};

export default StageSelect;
