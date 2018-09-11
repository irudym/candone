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
    selected: null,
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

  handlePersonClick = (person) => {
    const currentPerson = this.props.persons.find(e => e.id === person.id);

    if (currentPerson) {
      // in case of the second click on the note show the edit window
      if (currentPerson.id === this.state.currentPerson.id) {
        this.setState({
          showEditPerson: true,
        });
      }
      // if this is the first click, just show the markdown text of the selected not
      this.setState({
        currentPerson,
        selected: currentPerson.id,
      });
    }
  }

  handlePersonDelete = (person) => {
    this.props.deletePerson({ url: serverUrl, person });
  }

  handleEditPersonClose = () => this.setState({ showEditPerson: false });

  render() {
    return (
      <AppContent>
        <Header title="People">
          <Form>
            <Form.Group inline>
              <AddButton onClick={this.handleAddPersonShow} title="Person" />
              <SearchBar placeholder="Search a person..." />
            </Form.Group>
          </Form>
          <AddPerson show={this.state.showAddPerson} onClose={this.handleAddPersonClose} />
        </Header>
        <PeopleHolder
          onClick={this.handlePersonClick}
          onDelete={this.handlePersonDelete}
          selected={this.state.selected}
          person={this.state.currentPerson}
        />
        <EditPerson
          show={this.state.showEditPerson}
          person={this.state.currentPerson}
          onClose={this.handleEditPersonClose}
        />
      </AppContent>
    );
  }
}

People.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  deletePerson: PropTypes.func.isRequired,
};


const mapStateToProps = state => (
  {
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  deletePerson: value => dispatch(deletePerson(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
