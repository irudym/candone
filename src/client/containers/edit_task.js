import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateTask, deleteTask } from '../../redux/actions';
import TaskView from '../components/views/task';
import serverUrl from '../../globals/api_server';
import * as SCHEMAS from '../../lib/schemas';

class EditTask extends React.Component {
  // TODO: need to keep all task related records in separated object task:{} as
  // I'm going to store errors in the component state
  state = {
    urgency: 0,
    id: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("NEW PROPS: ", nextProps);
    // update state values
    // if (nextProps.task.id !== prevState.id) {
    return ({
      ...nextProps.task,
    });
    // }
    // return null;
  }

  handleUrgencyChange = (e, { value }) => this.setState({ urgency: value });

  handlePeopleChange = (e, { value }) => this.setState({ persons: value });

  handleTitleChange = (e) => this.setState({ title: e.target.value})

  handleDescriptionChange = (e) => this.setState({ description: e.target.value })

  handleTaskDelete = () => {
    console.log('Delete task with ID: ', this.state.id);
    this.props.deleteTask({
      url: serverUrl,
      task: this.state,
    });
    this.props.onClose();
  }

  handleStageChange = (e, { value }) => this.setState({ stage: value})

  handleTaskUpdate = () => {
    // TODO: need to validate all fields before submit data to the API server
    // validate()
    if (this.state.id === null) return;
    this.props.updateTask({
      url: serverUrl,
      task: { ...this.state, project_id: [this.props.projectID] },
    });

    this.props.onClose();
  }

  render() {
    if (!this.props.task) return null;

    const peopleOptions = this.props.persons.map(person => (
      {
        id: person.id,
        value: person.id,
        text: `${person.first_name} ${person.last_name}`,
      }
    ));
    return (
      <TaskView
        viewTitle="Edit the Task"
        show={this.props.show}
        onClose={this.props.onClose}
        urgencyValue={this.state.urgency.toString()}
        onUrgencyChange={this.handleUrgencyChange}
        peopleOptions={peopleOptions}
        onPeopleChange={this.handlePeopleChange}
        task={this.props.task}
        onSubmit={this.handleTaskUpdate}
        submitTitle="Update"
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
        onDelete={this.handleTaskDelete}
        onStageChange={this.handleStageChange}
      />
    );
  }
}

EditTask.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  projectID: PropTypes.number,
  task: PropTypes.shape(SCHEMAS.task).isRequired,
};

EditTask.defaultProps = {
  projectID: null,
};

const mapStateToProps = state => (
  {
    // errors: state.errors,
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  updateTask: value => dispatch(updateTask(value)),
  deleteTask: value => dispatch(deleteTask(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
