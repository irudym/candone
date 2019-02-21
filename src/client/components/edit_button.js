import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: 'transparent',
  color: elements.title,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `0px solid ${elements.okButtonBorder}`,
  height: '1rem',
  padding: '0 0.2rem',
};


const EditButton = ({
  title,
  onClick,
  style,
  noicon,
}) => (
  <Button onClick={onClick} style={{ ...buttonStyle, ...style }} className="candone-button">
    {
      noicon ?
      null
      :
      <Icon name="pencil" color={buttonStyle.color} />
    }
    {title}
  </Button>
);


EditButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  noicon: PropTypes.bool,
};


EditButton.defaultProps = {
  style: {},
  noicon: false,
};

export default EditButton;
