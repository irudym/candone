import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Message } from 'semantic-ui-react';
import PeopleSelect from './people_select';
import SubmitButton from './submit_button';
import CancelButton from './cancel_button';
import { elements } from '../styles/colors';

const blockStyle = {
  background: elements.header,
};

const iconStyle = {
  margin: 0,
};

const buttonStyle = {
  padding: '0.8rem',
  marginRight: '1rem',
};

const AddAction = ({
  show,
  peopleOptions,
  onAdd,
  onCancel,
  onTextChange,
  onOwnerChange,
}) => (
  show ?
    <Message style={blockStyle}>
      <Form>
        <PeopleSelect
          label="Owners"
          placeholder="Select a person or person who is responsible for the action..."
          peopleOptions={peopleOptions}
          onChange={onOwnerChange}
        />
        <Form.Input
          label="Action"
          placeholder="Enter short description of the action"
          onChange={onTextChange}
        />
        <SubmitButton title={<Icon name="plus" style={iconStyle} />} onClick={onAdd} style={buttonStyle} />
        <CancelButton title={<Icon name="cancel" style={iconStyle} />} onClick={onCancel} style={buttonStyle} />
      </Form>
    </Message>
    :
    null
);

AddAction.propTypes = {
  show: PropTypes.bool.isRequired,
  peopleOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onOwnerChange: PropTypes.func.isRequired,
};


export default AddAction;
