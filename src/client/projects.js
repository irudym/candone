import React, { Component } from 'react';

import Header from './components/header';
import AppContent from './components/app_content';
import AddButton from './components/add_button';

import AddProject from './containers/add_project';
import EditProject from './containers/edit_project';
import ProjectHolder from './containers/project_holder';


class Projects extends Component {
  state = {
    showAddProject: false,
    showEditProject: false,
    currentProject: {},
  }

  handleAddProjectShow = () => this.setState({ showAddProject: true });

  handleAddProjectClose = () => this.setState({ showAddProject: false });

  handleEditProjectShow = () => this.setState({ showEditProject: true });

  handleEditProjectClose = () => this.setState({ showEditProject: false });

  handleProjectClick = (project) => {
    this.setState({
      showEditProject: true,
      currentProject: project,
    });
  }

  render() {
    return (
      <AppContent>
        <Header title="Projects">
          <AddButton onClick={this.handleAddProjectShow} title="Project" />
          <AddProject show={this.state.showAddProject} onClose={this.handleAddProjectClose} />
        </Header>
        <ProjectHolder onClick={this.handleProjectClick} />
        <EditProject
          show={this.state.showEditProject}
          onClose={this.handleEditProjectClose}
          project={this.state.currentProject}
        />
      </AppContent>
    );
  }
}

export default Projects;
