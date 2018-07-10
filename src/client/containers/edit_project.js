import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateProject, deleteProject } from '../../redux/actions';

import serverUrl from '../../globals/api_server';

import { toOptionsList, toIDList } from '../../lib/utils';

import ProjectView from '../components/views/project';
import * as SCHEMAS from '../../lib/schemas';

class EditProject extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('NEW PROJECT PROPS: ', nextProps);
    const tasksOptions = toOptionsList(nextProps.tasks);
    // update state values
    return ({
      project: nextProps.project,
      tasksOptions,
    });
  }

  initialState = {
    project: {
      id: null,
      title: '',
      description: '',
      tasks: [],
      persons: [],
      notes: [],
    },
    selectedNote: null,
    selectedTask: null,
  }

  state = this.initialState;

  handleClose = () => {
    // clear component state fields
    this.setState(this.initialState);
    this.props.onClose();
  }

  handleProjectDelete = () => {
    this.props.deleteProject({
      url: serverUrl,
      project: this.state.project,
    });
  }

  handleUpdate = () => {
    // TODO: need to add validations
    // const { project } = this.state;
    console.log('Update project: ', this.state.project);
    this.props.updateProject({
      url: serverUrl,
      project: this.state.project,
    });

    this.handleClose();
  }

  handleTitleChange = e =>
    this.setState({ project: { ...this.state.project, title: e.target.value } });

  handleDescriptionChange = e =>
    this.setState({ project: { ...this.state.project, description: e.target.value } });

  handlePeopleChange = (e, { value }) =>
    this.setState({ project: { ...this.state.project, persons: value } });

  handleTaskSelect = (e, { value }) => {
    this.setState({
      selectedTask: value,
    });
  }

  handleNoteSelect = (e, { value }) => this.setState({ selectedNote: value });

  handleAddTask = () => {
    // in case selectedTask is undefined, return from the function
    if (!this.state.selectedTask) return;

    const task = this.props.tasks.filter(elem => elem.id === this.state.selectedTask);

    this.setState({
      project: {
        ...this.state.project,
        tasks: [
          ...this.state.project.tasks,
          task[0],
        ],
      },
      selectedTask: null,
    });
  }

  handleDeleteTask = (task) => {
    this.setState({
      project: {
        ...this.state.project,
        tasks: this.state.project.tasks.filter(elem => elem.id !== task.id),
      },
    });
  }

  handleAddNote = () => {
    if (!this.state.selectedNote) return;

    const note = this.props.notes.filter(elem => elem.id === this.state.selectedNote);
    this.setState({
      project: {
        ...this.state.project,
        notes: [
          ...this.state.project.notes,
          note[0],
        ],
      },
      selectedNote: null,
    });
  }

  render() {
    // TODO: move the code below to PeopleSelect component to reduce amount of toOptionsList function calls
    const peopleOptions = toOptionsList(this.props.persons, person => `${person.first_name} ${person.last_name}`);
    const notesOptions = toOptionsList(this.props.notes);
    console.log('RENDER PROJECT: ', this.state.project);
    return (
      <ProjectView
        show={this.props.show}
        onClose={this.handleClose}
        onDelete={this.handleProjectDelete}
        viewTitle="Edit Project"
        submitTitle="Update"
        project={this.state.project}
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
        onPeopleChange={this.handlePeopleChange}
        onTaskSelect={this.handleTaskSelect}
        onAddTask={this.handleAddTask}
        onNoteSelect={this.handleNoteSelect}
        onAddNote={this.handleAddNote}
        onSubmit={this.handleUpdate}
        peopleOptions={peopleOptions}
        notesOptions={notesOptions}
        tasksOptions={this.state.tasksOptions}
        notes={this.state.project.notes}
        tasks={this.state.project.tasks}
        onDeleteTask={this.handleDeleteTask}
      />
    );
  }
}

EditProject.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  updateProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)),
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)),
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)),
};

EditProject.defaultProps = {
  tasks: [],
  notes: [],
  persons: [],
};

const mapStateToProps = state => (
  {
    tasks: state.tasks,
    persons: state.persons,
    notes: state.notes,
  }
);

const mapDispatchToProps = dispatch => ({
  updateProject: value => dispatch(updateProject(value)),
  deleteProject: value => dispatch(deleteProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
