import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Grid, List } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Header from './components/header';
import AppContent from './components/app_content';
import InfoLabel from './components/info_label';
import CardHolder from './components/card_holder';
import AddTask from './containers/add_task';
import AddNote from './containers/add_note';
import EditNote from './containers/edit_note';
import EditTask from './containers/edit_task';
import NotesHolder from './components/notes_holder';
import AddButton from './components/add_button';
import ProjectHolder from './components/project_holder';

import { createFollowup } from '../lib/utils';

import { fetchProjects, fetchNotes, fetchPersons, fetchTasks, updateProject, setCurrentProject } from '../redux/actions';

import * as SCHEMAS from '../lib/schemas';
import serverUrl from '../globals/api_server';
import { elements } from './styles/colors';

const columnHeaderStyle = {
  fontFamily: 'Roboto',
  fontSize: '1.4rem',
  fontWeight: 600,
  padding: '1.5rem 0',
  color: elements.title,
};


class Dashboard extends Component {
  state = {
    showEditNote: false,
    showEditTask: false,
    showAddTask: false,
    showAddNote: false,
    currentNote: null,
    currentTask: null,
    newMarkdown: null,
  }

  componentDidMount() {
    if (this.props.projects.length === 0) this.props.fetchProjects(serverUrl);
    if (this.props.notes.length === 0) this.props.fetchNotes(serverUrl);
    if (this.props.persons.length === 0) this.props.fetchPersons(serverUrl);
    if (this.props.tasks.length === 0) this.props.fetchTasks(serverUrl);
  }

  handleProjectSelect = (project) => {
    // put notes to the projects
    console.log("PRJ: ", project);
    this.props.setCurrentProject(project);
  }

  handleShowEditNote = (note) => {
    // as soon the app loads all data to memory let's find the note in the records
    // TODO: need to implement the right way to handle errors!
    const currentNote = this.props.notes.find(elem => elem.id === note.id) || {
      ...note,
      markdown: `### ERROR! Cannot find the note in records\n---\nNote title: ${note.title}`,
      actions: [],
    };
    this.setState({
      currentNote,
      showEditNote: true,
    });
  }

  handleCloseEditNote = () => this.setState({ showEditNote: false });

  handleCloseAddTask = () => this.setState({ showAddTask: false });

  handleShowAddTask = () => this.setState({ showAddTask: true });

  handleShowAddNote = () => this.setState({
    showAddNote: true,
    newMarkdown: null,
  });

  handleCloseAddNote = () => this.setState({ showAddNote: false });


  handleShowEditTask = (task) => {
    console.log('DSBRD: showTask: ', task);
    this.setState({
      currentTask: task,
      showEditTask: true,
    });
  }

  handleCloseEditTask = () => this.setState({ showEditTask: false });

  handleDeleteTask = (task) => {
    const currentProject = {
      ...this.state.currentProject,
      tasks: this.state.currentProject.tasks.filter(elem => elem.id !== task.id),
    };
    this.props.setCurrentProject(currentProject);
    const project = {
      ...currentProject,
    };
    // update project
    this.props.updateProject({ url: serverUrl, project });
  }

  handleCreateNoteFollowup = (note) => {
    const markdown = createFollowup(note, this.props.tasks, this.props.persons);
    console.log('FOLLOWUP: ', markdown);

    this.setState({
      showAddNote: true,
      newMarkdown: markdown,
    });
  }

  render() {
    const { projects } = this.props;
    const todoTasks = [];
    const devTasks = [];
    const doneTasks = [];

    // update current project records
    const currentProject = projects.find(project => (project.id === this.props.currentProject.id)) || { tasks: [], notes: [] };

    console.log('It seems that project was reloaded: ', currentProject);
    // fill corersponding arrays with tasks
    if (currentProject.tasks) {
      currentProject.tasks.map((task) => {
        switch (task.stage) {
          case 0: todoTasks.push(task); break;
          case 1: devTasks.push(task); break;
          default: doneTasks.push(task);
        }
      });
    }
    return (
      <AppContent>
        <Header title="Dashboard" />
        <Grid columns="3">
          <Grid.Row>
            <Grid.Column key="1" width="3">
              <div style={columnHeaderStyle}>
                Projects
              </div>
              <ProjectHolder
                fullscreen
                devProjects={projects}
                onClick={this.handleProjectSelect}
                selected={currentProject.id}
              />
            </Grid.Column>
            <Grid.Column key="2" width="10">
              <div style={{ ...columnHeaderStyle, marginBottom: 7 }}>
                Tasks
              </div>
              <AddButton title="Task" onClick={this.handleShowAddTask} />
              <CardHolder
                todoTasks={todoTasks}
                devTasks={devTasks}
                doneTasks={doneTasks}
                onDelete={this.handleDeleteTask}
                onClick={this.handleShowEditTask}
              />
            </Grid.Column>
            <Grid.Column key="3" width="3" style={{ marginLeft: -60 }}>
              <div style={{ ...columnHeaderStyle, marginBottom: 7 }}>
                Notes
              </div>
              <AddButton title="Note" onClick={this.handleShowAddNote} />
              <NotesHolder
                notes={currentProject.notes}
                onClick={this.handleShowEditNote}
                fullscreen
                style={{ marginTop: 35 }}
                onFollowup={this.handleCreateNoteFollowup}
                // onDelete={this.handleNoteDelete}
                // selected={this.state.selected}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <AddTask
          show={this.state.showAddTask}
          onClose={this.handleCloseAddTask}
          projectID={currentProject.id}
        />
        <AddNote
          show={this.state.showAddNote}
          onClose={this.handleCloseAddNote}
          projectID={currentProject.id}
          markdown={this.state.newMarkdown}
        />
        <EditNote
          show={this.state.showEditNote}
          onClose={this.handleCloseEditNote}
          note={this.state.currentNote}
          projectID={currentProject.id}
        />
        <EditTask
          show={this.state.showEditTask}
          task={this.state.currentTask}
          onClose={this.handleCloseEditTask}
          projectID={currentProject.id}
        />
      </AppContent>
    );
  }
}

Dashboard.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.note)).isRequired,
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)).isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchNotes: PropTypes.func.isRequired,
  fetchPersons: PropTypes.func.isRequired,
  fetchTasks: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  setCurrentProject: PropTypes.func.isRequired,
  currentProject: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    projects: state.projects,
    notes: state.notes,
    persons: state.persons,
    tasks: state.tasks,
    currentProject: state.currentProject,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchProjects: value => dispatch(fetchProjects(value)),
  fetchNotes: value => dispatch(fetchNotes(value)),
  fetchPersons: value => dispatch(fetchPersons(value)),
  fetchTasks: value => dispatch(fetchTasks(value)),
  updateProject: value => dispatch(updateProject(value)),
  setCurrentProject: value => dispatch(setCurrentProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
