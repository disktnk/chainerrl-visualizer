import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DiscreteQvaluesPlotContainer from './DiscreteQvaluesPlotContainer';
import QvaluesDistributionPlotContainer from './QvaluesDistributionPlotContainer';
import ContinuousStochasticActionsAndValuePlotContainer from './ContinuousStochasticActionsAndValuePlotContainer';
import DiscreteStochasticActionsAndValuePlotContainer from './DiscreteStochasticActionsAndValuePlotContainer';
import ChartSkelton from '../components/ChartSkelton';

import {
  DISCRETE_ACTION_VALUE_PLOT,
  DISTRIBUTIONAL_ACTION_VALUE_PLOT,
  QUADRATIC_ACTION_VALUE_PLOT,
  GAUSSIAN_DISTRIBUTION_PLOT,
  SOFTMAX_DISTRIBUTION_PLOT,
  MELLOWMAX_DISTRIBUTION_PLOT,
  CONTINUOUS_DETERMINISTIC_DISTRIBUTION_PLOT,
} from '../settings/agent';

const ChartContainer = ({ selectedChartName }) => {
  switch (selectedChartName) {
    case DISCRETE_ACTION_VALUE_PLOT:
      return <DiscreteQvaluesPlotContainer />;
    case DISTRIBUTIONAL_ACTION_VALUE_PLOT:
      return <QvaluesDistributionPlotContainer />;
    case QUADRATIC_ACTION_VALUE_PLOT:
      return <div />; // TODO: implement QuadraticActionValuePlotContainer
    case GAUSSIAN_DISTRIBUTION_PLOT:
      return <ContinuousStochasticActionsAndValuePlotContainer />;
    case SOFTMAX_DISTRIBUTION_PLOT:
      return <DiscreteStochasticActionsAndValuePlotContainer />;
    case MELLOWMAX_DISTRIBUTION_PLOT:
      return <div />; // TODO: implement MellowmaxDistributionPlotContainer
    case CONTINUOUS_DETERMINISTIC_DISTRIBUTION_PLOT:
      return <div />;
    default:
      return <ChartSkelton />;
  }
};

ChartContainer.propTypes = {
  selectedChartName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  selectedChartName: state.chartControl.selectedChartName,
});

export default connect(mapStateToProps, null)(ChartContainer);
