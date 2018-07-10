import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Card } from 'semantic-ui-react';

const ActionsList = ({ actions, onDelete }) => (
  <div>
    {
      actions.map(action => (
        <Card key={action.id}>
          {action.title}
          <Button icon onClick={() => onDelete(action.id)}>
            <Icon name="trash outline" />
          </Button>
        </Card>
      ))
    }
  </div>
);

ActionsList.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionsList;
