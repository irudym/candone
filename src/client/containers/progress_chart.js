import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ChartBar from '../components/chart_bar';
import { fetchTaskAnalytics } from '../../redux/actions';
import serverUrl from '../../globals/api_server';


class ProgressChart extends React.Component {

  componentDidMount() {
    // fetch analytics
    const { fetchAnalytics } = this.props;
    fetchAnalytics({ url: serverUrl, weeks: 1 });
  }

  render() {
    const { progressChart } = this.props;
    if (progressChart.length === 0) return null;

    return (
      <ChartBar data={progressChart} />
    );
  }
}

ProgressChart.propTypes = {
  progressChart: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchAnalytics: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    progressChart: state.progressChart,
  }
);

const mapDispatchToProps = dispatch => ({
  fetchAnalytics: value => dispatch(fetchTaskAnalytics(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressChart);
