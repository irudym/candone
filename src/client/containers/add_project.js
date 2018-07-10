import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProjectView from '../components/views/project';

import { createProject, fetchTasks, fetchNotes, fetchPersons } from '../../redux/actions';
import { toOptionsList } from '../../lib/utils';

import * as SCHEMAS from '../../lib/schemas';

import serverUrl from '../../globals/api_server';

class AddProject extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // update state values
    const tasksOptions = toOptionsList(nextProps.tasks);
    return { tasksOptions };
  }

  initialState = {
    project: {
      tasks: [],
      persons: [],
      notes: [],
      title: null,
      description: null,
    },
    tasksOptions: [],
    selectedTask: null,
    selectedNote: null,
  }

  state = this.initialState;

  componentDidMount() {
    // TODO: load persons and tasks and other related lists in case they are empty
    if (this.props.tasks.length === 0) this.props.fetchTasks(serverUrl);
    if (this.props.notes.length === 0) this.props.fetchNotes(serverUrl);
    if (this.props.persons.length === 0) this.props.fetchPersons(serverUrl);
  }


  handleTitleChange = (e) => this.setState({ project: { ...this.state.project, title: e.target.value }})

  handleDescriptionChange = (e) => this.setState({ project: { ...this.state.project, description: e.target.value }})

  handleClose = () => {
    // Reset state to default
    this.setState({ ...this.initialState });
    this.props.onClose();
  }

  handleTaskSelect = (e, { value }) => {
    this.setState({
      selectedTask: value,
    });
  }

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

  handleNoteSelect = (e, { value }) => this.setState({ selectedNote: value });

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

  handlePeopleChange = (e, { value }) =>
    this.setState({ project: { ...this.state.project, persons: value } });

  handleAddProject = () => {
    console.log('Add Project: ', this.state.project);

    // TODO: Add project validations
    this.props.createProject({
      url: serverUrl,
      project: this.state.project,
    });
    this.props.onClose();
  }

  render() {
    // TODO: move the code below to PeopleSelect component to reduce amount of toOptionsList function calls
    const peopleOptions = toOptionsList(this.props.persons, person => `${person.first_name} ${person.last_name}`);
    const notesOptions = toOptionsList(this.props.notes);
    return (
      <ProjectView
        show={this.props.show}
        onClose={this.handleClose}
        tasks={this.state.project.tasks}
        tasksOptions={this.state.tasksOptions}
        onTaskSelect={this.handleTaskSelect}
        onAddTask={this.handleAddTask}
        onSubmit={this.handleAddProject}
        onTitleChange={this.handleTitleChange}
        onDescriptionChange={this.handleDescriptionChange}
        onPeopleChange={this.handlePeopleChange}
        peopleOptions={peopleOptions}
        notes={this.state.project.notes}
        notesOptions={notesOptions}
        onNoteSelect={this.handleNoteSelect}
        onAddNote={this.handleAddNote}
      />
    );
  }
}

AddProject.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)),
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)),
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)),
  fetchTasks: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  fetchPersons: PropTypes.func.isRequired,
};

AddProject.defaultProps = {
  tasks: [],
  notes: [],
  persons: [],
};

const mapStateToProps = state => (
  {
    // errors: state.errors,
    tasks: state.tasks,
    persons: state.persons,
    notes: state.notes,
  }
);

const mapDispatchToProps = dispatch => ({
  createProject: value => dispatch(createProject(value)),
  fetchTasks: value => dispatch(fetchTasks(value)),
  fetchNotes: value => dispatch(fetchNotes(value)),
  fetchPersons: value => dispatch(fetchPersons(value)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
