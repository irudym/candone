import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'semantic-ui-react';

const InfoLabel = ({ title, count }) => (
  <Label>
    {title}
    <Label.Detail>{count}</Label.Detail>
  </Label>
);

InfoLabel.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
};

InfoLabel.defaultProps = {
  title: '',
  count: 0,
};

export default InfoLabel;
