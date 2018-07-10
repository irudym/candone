import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form } from 'semantic-ui-react';

import Header from './components/header';
import AppContent from './components/app_content';
import AddPerson from './containers/add_person';
import AddButton from './components/add_button';
import SearchBar from './components/search_bar';
import PeopleHolder from './containers/people_holder';
import EditPerson from './containers/edit_person';

import { deletePerson } from '../redux/actions';
import serverUrl from '../globals/api_server';

import * as SCHEMAS from '../lib/schemas';

class People extends Component {
  state = {
    showAddPerson: false,
    showEditPerson: false,
    currentPerson: {
      id: -1,
      first_name: '',
      last_name: '',
      email: '',
      description: '',
      person_type_id: -1,
    },
  }

  handleAddPersonShow = () => {
    this.setState({
      showAddPerson: true,
    });
  }

  handleAddPersonClose = () => {
    this.setState({
      showAddPerson: false,
    });
  }

  handlePersonClick = (id) => {
    const currentPerson = this.props.persons.filter(e => e.id === id)[0];
    if(currentPerson) {
      this.setState({
        showEditPerson: true,
        currentPerson,
      });
    }
  }

  handlePersonDelete = (person) => {
    this.props.deletePerson({ url: serverUrl, person });
  }

  handleEditPersonClose = () => this.setState({ showEditPerson: false});

  render() {
    return (
      <AppContent>
        <Header>
          <Form>
            <Form.Group inline>
              <AddButton onClick={this.handleAddPersonShow} title="Person"/>
              <SearchBar placeholder="Search a person..." />
            </Form.Group>
          </Form>
          <AddPerson show={this.state.showAddPerson} onClose={this.handleAddPersonClose} />
        </Header>
        <PeopleHolder
          onClick={this.handlePersonClick}
          onDelete={this.handlePersonDelete}
        />
        <EditPerson
          show={this.state.showEditPerson}
          person={this.state.currentPerson}
          onClose={this.handleEditPersonClose}
        />
      </AppContent>
    )
  }
}

People.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)),
  deletePerson: PropTypes.func.isRequired,
}


const mapStateToProps = state => (
  {
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  deletePerson: value => dispatch(deletePerson(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
