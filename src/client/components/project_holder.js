import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import ProjectCard from './project_card';
import colors from '../styles/colors';

import * as SCHEMAS from '../../lib/schemas';

const holderStyle = {
  background: colors.gray,
};

const Header = () => (
  <Grid.Row>
    <Grid.Column key="1" width="5">
      In Progress
    </Grid.Column>
    <Grid.Column key="2" width="5">
      Done
    </Grid.Column>
  </Grid.Row>
);

const ProjectColumn = ({
  key,
  width,
  projects,
  onClick,
  onDelete,
}) => (
  <Grid.Column key={key} width={width} style={holderStyle}>
    {projects.map(project => (
      <ProjectCard
        key={project.id}
        project={project}
        onClick={onClick}
        onDelete={onDelete}
      />
    ))}
  </Grid.Column>
);

ProjectColumn.propTypes = {
  key: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};


const ProjectHolder = ({
  devProjects,
  doneProjects,
  onClick,
  onDelete,
}) => (
  <Grid columns="2" stackable>
    <Header />
    <Grid.Row>
      <ProjectColumn
        key="1"
        width="8"
        projects={devProjects}
        onClick={onClick}
        onDelete={onDelete}
      />
      <ProjectColumn
        key="2"
        width="8"
        projects={doneProjects}
        onClick={onClick}
        onDelete={onDelete}
      />
    </Grid.Row>
  </Grid>
);

ProjectHolder.propTypes = {
  devProjects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  doneProjects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectHolder;
