import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: elements.cancelButton,
  color: elements.buttonCaption,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.cancelButtonBorder}`,
};


const CancelButton = ({ title, onClick, style }) => (
  <Button onClick={onClick} style={{ ...style, ...buttonStyle }} className="candone-cancel-button">
    {title}
  </Button>
);

CancelButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

CancelButton.defaultProps = {
  title: 'Cancel',
  style: {},
};

export default CancelButton;
