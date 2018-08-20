import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import ProjectCard from './project_card';
import colors, { elements } from '../styles/colors';

import * as SCHEMAS from '../../lib/schemas';

const holderStyle = {
  background: colors.gray,
  border: `1px solid ${colors.borderGray}`,
  margin: 8,
  padding: '1rem',
};

const headerStyle = {
  color: elements.title,
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '1.4rem',
  marginBottom: '1rem 8px',
  padding: '1rem',
};

const ProjectColumn = ({
  key,
  width,
  projects,
  onClick,
  onDelete,
  header,
  selected,
}) => (
  <Grid.Column key={key} width={width}>
    {header ?
      <div style={headerStyle}>
        {header}
      </div>
      :
      null
    }
    <div style={holderStyle}>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onClick={onClick}
          onDelete={onDelete}
          selected={selected === project.id}
        />
      ))}
    </div>
  </Grid.Column>
);

ProjectColumn.propTypes = {
  key: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  header: PropTypes.string,
  selected: PropTypes.number,
};

ProjectColumn.defaultProps = {
  selected: null,
  header: null,
};


const ProjectHolder = ({
  devProjects,
  doneProjects,
  onClick,
  onDelete,
  fullscreen,
  selected,
}) => (
  <Grid columns={fullscreen ? '1' : '2'} stackable>
    <Grid.Row>
      <ProjectColumn
        key="1"
        width={fullscreen ? null : '8'}
        projects={devProjects}
        onClick={onClick}
        onDelete={onDelete}
        header={fullscreen ? null : 'In Progress'}
        selected={selected}
      />
      {fullscreen ?
        null
        :
        <ProjectColumn
          key="2"
          projects={doneProjects}
          onClick={onClick}
          onDelete={onDelete}
          header="Done"
        />
      }
    </Grid.Row>
  </Grid>
);

ProjectHolder.propTypes = {
  devProjects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  doneProjects: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.project)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool,
  selected: PropTypes.number,
};

ProjectHolder.defaultProps = {
  fullscreen: false,
  selected: null,
};

export default ProjectHolder;
