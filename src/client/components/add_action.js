import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Message } from 'semantic-ui-react';
import PeopleSelect from './people_select';

const addActionStyle = {
  cancelButton: {
    marginLeft: '1rem',
  },
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
    <Message>
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
        <Button icon color="blue" onClick={onAdd} >
          <Icon name="plus" />
        </Button>
        <Button icon style={addActionStyle.cancelButton} onClick={onCancel} >
          <Icon name="cancel" />
        </Button>
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
