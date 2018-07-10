// TODO: rename CardHHolder to TaskHolder to be more consistent with names
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTasks } from '../../redux/actions';

import CardHolderComponent from '../components/card_holder';

import * as SCHEMAS from '../../lib/schemas';
import serverUrl from '../../globals/api_server';

class CardHolder extends React.Component {
  componentDidMount() {
    // load all task from remote API
    this.props.fetchTasks(serverUrl);
  }


  render() {
    // create groups
    const todoTasks = [];
    const devTasks = [];
    const doneTasks = [];

    // fill corersponding arrays with tasks
    if (this.props.tasks) {
      this.props.tasks.map((task) => {
        switch (task.stage) {
          case 0: todoTasks.push(task); break;
          case 1: devTasks.push(task); break;
          default: doneTasks.push(task);
        }
      });
    }
    return (
      <CardHolderComponent
        todoTasks={todoTasks}
        devTasks={devTasks}
        doneTasks={doneTasks}
        onClick={this.props.onClick}
        onDelete={this.props.onDelete}
      />
    );
  }
}

CardHolder.propTypes = {
  fetchTasks: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape(SCHEMAS.task)).isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    tasks: state.tasks,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchTasks: value => dispatch(fetchTasks(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardHolder);
