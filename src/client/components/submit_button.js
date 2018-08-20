import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: elements.okButton,
  color: elements.buttonCaption,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.okButtonBorder}`,
};


const SubmitButton = ({ title, onClick, style }) => (
  <Button onClick={onClick} style={{ ...style, ...buttonStyle }} className="candone-button">
    {title}
  </Button>
);

SubmitButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

SubmitButton.defaultProps = {
  title: 'Add',
  style: null,
};

export default SubmitButton;
