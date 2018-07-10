import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects, deleteProject } from '../../redux/actions';

import ProjectHolderComponent from '../components/project_holder';

import * as SCHEMAS from '../../lib/schemas';
import serverUrl from '../../globals/api_server';


class ProjectHolder extends React.Component {
  componentDidMount() {
    this.props.fetchProjects(serverUrl);
  }

  handleProjectDelete = (project) => {
    this.props.deleteProject({
      url: serverUrl,
      project,
    });
  }

  render() {
    const devProjects = [];
    const doneProjects = [];

    // fill corresponding arrays with projects
    if (this.props.projects) {
      this.props.projects.map((project) => {
        switch (project.stage) {
          case 1: devProjects.push(project); break;
          default: doneProjects.push(project);
        }
      });
    }
    return (
      <ProjectHolderComponent
        devProjects={devProjects}
        doneProjects={doneProjects}
        onClick={this.props.onClick}
        onDelete={this.handleProjectDelete}
      />
    );
  }
}

ProjectHolder.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)),
  onClick: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};

ProjectHolder.defaultProps = {
  projects: [],
};

const mapStateToProps = state => (
  {
    projects: state.projects,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchProjects: value => dispatch(fetchProjects(value)),
  deleteProject: value => dispatch(deleteProject(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHolder);
