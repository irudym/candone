import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import Card from './card';

import * as SCHEMAS from '../../lib/schemas';
import colors from '../styles/colors';

const ProjectCard = ({
  project,
  onClick,
  onDelete,
  selected,
}) => (
  <Card onClick={() => (onClick(project))} selected={selected}>
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
  selected: PropTypes.bool,
};

ProjectCard.defaultProps = {
  selected: false,
};

export default ProjectCard;
