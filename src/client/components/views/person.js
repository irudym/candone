/**
 * Universal component to create, edit a person record
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, TextArea, Dropdown, Button } from 'semantic-ui-react';

import DeleteButton from '../delete_button';

import * as SCHEMAS from '../../../lib/schemas';

const TypeSelect = ({ placeholder, typeOptions, onChange, defaultValue }) => (
  <Dropdown
    placeholder={placeholder}
    fluid
    search
    selection
    options={typeOptions}
    onChange={onChange}
    defaultValue={defaultValue}
  />
);

/**
 * [Person description]
 * @param {string} viewTitle           Modal dialog title, default value is "Add a Person"
 * @param {array} typeOptions          Arraiy of person types: internal, external and so on
 * @param {func} onSubmit              Form submit handle function
 * @param {func} onClose               Modal dialog close handler
 * @param {func} onDelete              Delete record handler, in not null the view will show delete button
 * @param {func} onFirstNameChange     First name input change handler
 * @param {func} onLastNameChange      Last name input change handler
 * @param {func} onEmailChange         Email input change handler
 * @param {func} onDescriptionChange   Description text change handler
 * @param {func} onTypeChange          Type change handler
 * @param {bool} show                  Show or hide the modal view
 * @param {string} submitTitle         Submit button title, by default it's 'Add'
 * @param {[type]} person              Person object
 */
const Person = ({
  viewTitle,
  typeOptions,
  onSubmit,
  onClose,
  onDelete,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onDescriptionChange,
  onTypeChange,
  show,
  submitTitle,
  person,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} open={show} onClose={onClose} >
    <Modal.Header>{viewTitle}</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group widths="equal">
          <Form.Input fluid label="First name" placeholder="First name" onChange={onFirstNameChange} defaultValue={person.first_name} />
          <Form.Input fluid label="Last name" placeholder="Last name" onChange={onLastNameChange} defaultValue={person.last_name} />
        </Form.Group>
        <Form.Input label="email" placeholder="Enter email" onChange={onEmailChange} defaultValue={person.email} />
        <Form.Field control={TextArea} label="Description" placeholder="Person description" onChange={onDescriptionChange} defaultValue={person.description} />
        <Form.Group inline>
          <label>Type</label>
          <TypeSelect
            placeholder="Select type"
            typeOptions={typeOptions}
            onChange={onTypeChange}
            defaultValue={person.person_type_id ? person.person_type_id : 1}
          />
        </Form.Group>
      </Form>
    </Modal.Content>
    <Modal.Actions>
      {onDelete ?
        <DeleteButton onClick={onDelete} />
        :
        ''
      }
      <Button color="blue" onClick={onSubmit} >
        {submitTitle}
      </Button>
      <Button color="gray" onClick={onClose} >
         Cancel
      </Button>
    </Modal.Actions>
  </Modal>
);

Person.propTypes = {
  viewTitle: PropTypes.string,
  submitTitle: PropTypes.string,
  typeOptions: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    value: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onFirstNameChange: PropTypes.func.isRequired,
  onLastNameChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  person: PropTypes.shape(SCHEMAS.person),
};

Person.defaultProps = {
  viewTitle: 'Add a Person',
  submitTitle: 'Add',
  onDelete: null,
  person: {
    id: null,
    first_name: null,
    last_name: null,
    description: null,
    email: null,
    person_type_id: -1,
  },
};

export default Person;
