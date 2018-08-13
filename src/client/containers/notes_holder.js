import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchNotes } from '../../redux/actions';
import NotesHolderComponent from '../components/notes_holder';

import serverUrl from '../../globals/api_server';

class NotesHolder extends React.Component {
  componentDidMount() {
    // load all notes from remote API
    this.props.fetchNotes(serverUrl);
    console.log("Fetching notes...");
  }

  render() {
    // TODO: it could be <NotesHolderComponent {...this.props} />
    return (
      <NotesHolderComponent
        notes={this.props.notes}
        onClick={this.props.onClick}
        onDelete={this.props.onDelete}
        markdown={this.props.markdown}
        selected={this.props.selected}
      />
    );
  }
}

NotesHolder.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchNotes: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  markdown: PropTypes.string,
  selected: PropTypes.number,
};

NotesHolder.defaultProps = {
  markdown: null,
  selected: null,
};

const mapStateToProps = state => (
  {
    notes: state.notes,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchNotes: value => dispatch(fetchNotes(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotesHolder);
