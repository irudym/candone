import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskView from '../components/views/task';

import { fetchPersons, createTask } from '../../redux/actions';
import * as SCHEMAS from '../../lib/schemas';
import serverUrl from '../../globals/api_server';

import { getTodayDate } from '../../lib/utils';

class AddTask extends React.Component {
  // TODO: move task related fields to separated object 'task' inside Component state
  initialState = {
    urgency: '1',
    persons: [],
    title: '',
    description: '',
    stage: 0,
    errors: [],
    // task: {},
  }
  state = this.initialState;

  componentDidMount() {
    // load persons from API server in case person list is empty
    if (this.props.persons.length === 0) {
      this.props.fetchPersons(serverUrl);
    }
  }

  handleUrgencyChange = (e, { value }) => this.setState({ urgency: value });

  handleClose = () => {
    // Reset state to default
    this.setState({ ...this.initialState });
    this.props.onClose();
  }

  handlePeopleChange = (e, { value }) => {
    this.setState({
      persons: value,
    });
  }

  handleTitleChange = e => this.setState({ title: e.target.value })

  handleDescriptionChange = e => this.setState({ description: e.target.value })

  validates = () => true

  handleAddTask = () => {
    console.log("Add task: ", this.state);
    if (this.validates()) {
      const description = this.state.description.replace(/\[today\]/g, getTodayDate());
      this.props.createTask({
        url: serverUrl,
        task: { ...this.state, description, project_id: [this.props.projectID] },
      });

      // in case Project ID provided: reload projects to apply changes into Redux state
      // if (this.props.projectID) {
      //  this.props.reloadProject({ url: serverUrl, id: this.props.projectID });
      // }

      this.props.onClose();
    }
  }

  render() {
    const { urgency } = this.state;

    const peopleOptions = this.props.persons.map(person => (
      {
        id: person.id,
        value: person.id,
        text: `${person.first_name} ${person.last_name}`,
      }
    ));

    return (
      <TaskView
        urgencyValue={urgency}
        show={this.props.show}
        onUrgencyChange={this.handleUrgencyChange}
        peopleOptions={peopleOptions}
        onClose={this.handleClose}
        onPeopleChange={this.handlePeopleChange}
        onSubmit={this.handleAddTask}
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
      />
    );
  }
}

AddTask.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)),
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createTask: PropTypes.func.isRequired,
  fetchPersons: PropTypes.func.isRequired,
  projectID: PropTypes.number,
};

AddTask.defaultProps = {
  persons: [],
  projectID: null,
};

const mapStateToProps = state => (
  {
    // errors: state.errors,
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchPersons: value => dispatch(fetchPersons(value)),
  createTask: value => dispatch(createTask(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
