// TODO: rename Table to Tasks to be more consistent with names
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddTask from './containers/add_task';
import EditTask from './containers/edit_task';
import Header from './components/header';
import CardHolder from './containers/card_holder';
import AppContent from './components/app_content';
import AddButton from './components/add_button';

import { deleteTask } from '../redux/actions';
import serverUrl from '../globals/api_server';

class Table extends Component {
  state = {
    showAddTask: false,
    showEditTask: false,
    currentTask: {
      id: -1,
      title: '',
      description: '',
      urgency: 0,
      stage: 0,
    }
  }

  handleAddTaskShow = () => {
    this.setState({
      showAddTask: true,
    });
  }

  handleAddTaskClose = () => {
    this.setState({
      showAddTask: false,
    });
  }

  handleTaskClick = (task) => {
    console.log("TABLE: task ",task);
    const currentTask = this.props.tasks.find(e => e.id === task.id);
    console.log('Set current task: ', currentTask);
    if (currentTask) {
      this.setState({
        showEditTask: true,
        currentTask,
      });
    }
  }

  handleEditTaskClose = () => {
    this.setState({
      showEditTask: false,
    });
  }

  handleTaskDelete = (task) => {
    this.props.deleteTask({ url: serverUrl, task });
  }

  render() {
    return (
      <AppContent>
        <Header>
          <AddButton onClick={this.handleAddTaskShow} title="Task" />
          <AddTask show={this.state.showAddTask} onClose={this.handleAddTaskClose} />
        </Header>
        <CardHolder
          onClick={this.handleTaskClick}
          onDelete={this.handleTaskDelete}
        />
        <EditTask
          show={this.state.showEditTask}
          task={this.state.currentTask}
          onClose={this.handleEditTaskClose}
        />
      </AppContent>
    );
  }
}

Table.propTypes = {
  deleteTask: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    tasks: state.tasks,
  }
);

const mapDispatchToProps = dispatch => ({
  deleteTask: value => dispatch(deleteTask(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
