import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

import * as SCHEMAS from '../../lib/schemas';

const PersonDescription = ({ person }) => (
  <Table celled selectable>
    <Table.Body>
      <Table.Row>
        <Table.Cell><b>Name</b></Table.Cell>
        <Table.Cell>{`${person.first_name} ${person.last_name}`}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell><b>Email</b></Table.Cell>
        <Table.Cell>{person.email}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell><b>Description</b></Table.Cell>
        <Table.Cell>{person.description}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

PersonDescription.propTypes = {
  person: PropTypes.shape(SCHEMAS.person).isRequired,
};

export default PersonDescription;
