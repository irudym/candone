import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

import { elemnts } from '../styles/colors';

const followupButtonStyle = {
  position: 'absolute',
  left: -10,
  top: 0,
  background: 'transparent',
  fontSize: '1.5rem',
  opacity: 0,
  transitionDuration: '0.5s',
};

const FollowupButton = ({ onClick }) => (
  <Button className="followup-icon" icon float="right" onClick={(e) => { e.stopPropagation(); onClick(); }} style={followupButtonStyle}>
    <Icon name="recycle" />
  </Button>
);

FollowupButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FollowupButton;
