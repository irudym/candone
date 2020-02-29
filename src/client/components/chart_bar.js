import React from 'react';
import PropTypes from 'prop-types';
import { BarChart, Bar, ResponsiveContainer, XAxis, LabelList } from 'recharts';

import colors from '../styles/colors';

const toLabel = (value) => {
  console.log("ToLabel: ", value);

  if (value === '0') return null;
  return value;
};

const ChartBar = ({ data }) => (
  <ResponsiveContainer>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <Bar dataKey="value" fill={colors.green}>
        <LabelList dataKey="value" position="insideTop" valueAccessor={toLabel} />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

ChartBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChartBar;

