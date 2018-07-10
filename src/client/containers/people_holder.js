import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import PeopleHolderComponent from '../components/people_holder';
import * as SCHEMAS from '../../lib/schemas';
import { fetchPersons, fetchPersonTypes } from '../../redux/actions';
import serverUrl from '../../globals/api_server';

class PeopleHolder extends React.Component {
  componentDidMount() {
    if (this.props.persons.length === 0) {
      // load people from API server
      this.props.fetchPersons(serverUrl);
      this.props.fetchPersonTypes(serverUrl);
    }
  }

  render() {
    return (
      <PeopleHolderComponent
        people={this.props.persons}
        onClick={this.props.onClick}
        onDelete={this.props.onDelete}
      />
    );
  }
}

PeopleHolder.propTypes = {
  persons: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.person)).isRequired,
  fetchPersons: PropTypes.func.isRequired,
  fetchPersonTypes: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    persons: state.persons,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchPersons: value => dispatch(fetchPersons(value)),
  fetchPersonTypes: value => dispatch(fetchPersonTypes(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeopleHolder);
