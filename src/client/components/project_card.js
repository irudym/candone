import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import Card from './card';

import * as SCHEMAS from '../../lib/schemas';
import colors from '../styles/colors';

const ProjectCard = ({ project, onClick, onDelete }) => (
  <Card onClick={() => (onClick(project))}>
    <Card.Content color={colors.gray} onDelete={() => { onDelete(project); }}>
      <Card.Header>
        { project.title }
      </Card.Header>
      <Card.Meta>
        <span className="date">
          {project.description}
        </span>
      </Card.Meta>
      <Card.Description>
        <Icon name="file text outline" />
        { project.notes.length }
        <Icon name="browser" />
        { project.tasks.length }
        <Icon name="users" />
        { project.persons.length }
      </Card.Description>
    </Card.Content>
  </Card>
);

ProjectCard.propTypes = {
  project: PropTypes.shape(SCHEMAS.project).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
