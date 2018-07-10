import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as SCHEMAS from '../../lib/schemas';
import PersonView from '../components/views/person';
import { updatePerson, deletePerson } from '../../redux/actions';
import serverUrl from '../../globals/api_server';


class EditPerson extends React.Component {

  state = {
    errors: [],
    person: {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      description: '',
      person_type_id: '',
    }
  }

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("NEW PROPS: ", nextProps);
    // update state values
    if (nextProps.person.id !== prevState.person.id) {
      return ({
        person: nextProps.person,
      });
    }
    return null;
  }

  handleClose = () => {
    this.setState({
      errors: [],
    });
    this.props.onClose();
  }

  handleFirstNameChange = (e) => {
    this.setState({
      person: {
        ...this.state.person,
        first_name: e.target.value,
      }
    });
  }

  handleLastNameChange = (e) => {
    this.setState({
      person: {
        ...this.state.person,
        last_name: e.target.value,
      }
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
      person: {
        ...this.state.person,
        description: e.target.value,
      }
    });
  }

  handleEmailChange = (e) => {
    this.setState({
      person: {
        ...this.state.person,
        email: e.target.value,
      }
    });
  }

  handleTypeChange = (e, { value }) => {
    this.setState({
      person: {
        ...this.state.person,
        person_type_id: value,
      }
    });
  }

  validates = () => {
    const errors = [];
    const { person } = this.state;
    console.log("Validates: ");
    console.log("==> name: ", person.first_name, " ", person.last_name);
    console.log("==> description: ", person.description);
    console.log("==> email: ", person.email);
    console.log("==> type: ", person.person_type_id);

    return errors;
  }

  handleUpdate = () => {
    // clear errors
    console.log('Update a person');
    const errors = this.validates();
    if(errors.length !== 0) {
      this.setState({
        errors,
      });
      return;
    }
    // call action
    const { person } = this.state;

    // API call
    this.props.updatePerson({
      url: serverUrl,
      person: this.state.person,
    });
    this.props.onClose();
  }

  handlePersonDelete = () => {
    console.log('Delete person with ID: ', this.state.person.id);
    this.props.deletePerson({
      url: serverUrl,
      person: this.state.person,
    });
    this.props.onClose();
  }

  render() {
    // fix personTypes to fit typeOption schema
    const typeOptions = this.props.personTypes.map( element => (
      {
        key: element.id,
        value: element.id,
        text: element.name,
      }
    ));

    return (
      <PersonView
        viewTitle="Edit the Person"
        typeOptions={typeOptions}
        onClose={this.handleClose}
        onSubmit={this.handleUpdate}
        onDelete={this.handlePersonDelete}
        submitTitle="Update"
        onFirstNameChange={this.handleFirstNameChange}
        onLastNameChange={this.handleLastNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        onEmailChange={this.handleEmailChange}
        onTypeChange={this.handleTypeChange}
        show={this.props.show}
        person={this.props.person}
      />
    )
  }
};

EditPerson.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  personTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  person: PropTypes.shape(SCHEMAS.person).isRequired,
  updatePerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
}

const mapStateToProps = state => (
  {
    // errors: state.errors,
    personTypes: state.personTypes,
  }
);

const mapDispatchToProps = dispatch => ({
  updatePerson: value => dispatch(updatePerson(value)),
  deletePerson: value => dispatch(deletePerson(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPerson);
