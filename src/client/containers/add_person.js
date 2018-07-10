import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonView from '../components/views/person';
import { fetchPersonTypes, createPerson } from '../../redux/actions';

import serverUrl from '../../globals/api_server';


class AddPerson extends React.Component {
  state = {
    errors: [],
    person: {
      first_name: '',
      last_name: '',
      email: '',
      description: '',
      person_type_id: '',
    },
  }

  componentDidMount() {
    // update person types from server
    this.props.fetchPersonTypes(serverUrl);
  }

  handleClose = () => {
    this.setState({
      errors: [],
      person: {
        first_name: '',
        last_name: '',
        email: '',
        description: '',
        person_type_id: null,
      },
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
    console.log("CHANGE type_id to ", value);
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

  handleAdd = () => {
    // clear errors
    console.log('Add a person');
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
    this.props.createPerson({
      url: serverUrl,
      person,
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
        typeOptions={typeOptions}
        onClose={this.handleClose}
        onSubmit={this.handleAdd}
        onFirstNameChange={this.handleFirstNameChange}
        onLastNameChange={this.handleLastNameChange}
        onDescriptionChange={this.handleDescriptionChange}
        onEmailChange={this.handleEmailChange}
        onTypeChange={this.handleTypeChange}
        show={this.props.show}
      />
    )
  }
};

AddPerson.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createPerson: PropTypes.func.isRequired,
  fetchPersonTypes: PropTypes.func.isRequired,
  personTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const mapStateToProps = state => (
  {
    // errors: state.errors,
    personTypes: state.personTypes,
  }
);

const mapDispatchToProps = dispatch => ({
  createPerson: value => dispatch(createPerson(value)),
  fetchPersonTypes: value => dispatch(fetchPersonTypes(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPerson);
