import React from 'react';
import PropTypes from 'prop-types';

import { elements } from '../styles/colors';

const buttonStyle = {
  background: 'transparent',
  border: 'transparent',
  cursor: 'pointer',
  marginLeft: '0.5rem',
  outline: 'none',
  fontFamily: 'Roboto',
  fontSize: '1.2rem',
  fontWeight: 400,
};

const SpecialButton = ({ title, onClick }) => (
  <button onClick={onClick} className="candone-special-button" style={buttonStyle}>
    [{title}]
  </button>
);

SpecialButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SpecialButton;
