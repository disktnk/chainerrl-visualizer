import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend,
} from 'recharts';


/* eslint-disable prefer-destructuring */

const QvaluesDistributionPlotContainer = ({ actionMeanings, actionColors, qvalueDist }) => (
  <div>
    <BarChart
      width={900}
      height={460}
      data={qvalueDist}
    >
      {
          Object.values(actionMeanings).map((actionMeaning, idx) => (
            <Bar dataKey={actionMeaning} stackId="a" key={actionMeaning} fill={actionColors[idx]} />
          ))
        }
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="z_value" />
      <YAxis />
      <Legend />
    </BarChart>
  </div>
);

const mapStateToQvalueDist = (state) => {
  const logDataRow = state.log.logDataRows[state.plotRange.focusedStep];
  const actionMeanings = state.serverState.actionMeanings;

  if (!logDataRow || !Object.prototype.hasOwnProperty.call(logDataRow, 'qvalue_dist')) {
    return [];
  }

  const qvalueDist = [];
  for (let i = 0; i < logDataRow.qvalue_dist.length; i++) {
    const rowArr = logDataRow.qvalue_dist[i];
    const rowObj = {};
    for (let j = 0; j < rowArr.length; j++) {
      rowObj[actionMeanings[j]] = rowArr[j];
    }
    rowObj.z_value = logDataRow.z_values[i];
    qvalueDist.push(rowObj);
  }

  return qvalueDist;
};

QvaluesDistributionPlotContainer.propTypes = {
  actionMeanings: PropTypes.object.isRequired, /* eslint-disable-line react/forbid-prop-types */
  actionColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  qvalueDist: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

const mapStateToProps = (state) => ({
  actionColors: state.serverState.actionColors,
  actionMeanings: state.serverState.actionMeanings,
  qvalueDist: mapStateToQvalueDist(state),
});

export default connect(mapStateToProps, null)(QvaluesDistributionPlotContainer);
