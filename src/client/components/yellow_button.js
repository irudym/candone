import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: elements.yellowButton,
  color: elements.buttonCaption,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.yellowButtonBorder}`,
};


const YellowButton = ({ title, onClick, style, icon }) => (
  <Button onClick={onClick} style={{ ...buttonStyle, ...style }} className="candone-yellow-button">
    {
      icon ?
        <Icon name={icon} color={buttonStyle.color} />
        :
        null
    }
    {title}
  </Button>
);


YellowButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  icon: PropTypes.string,
};


YellowButton.defaultProps = {
  style: {},
  icon: null,
};

export default YellowButton;
