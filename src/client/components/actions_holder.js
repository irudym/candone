import React from 'react';
import PropTypes from 'prop-types';



const holderStyle = {
  margin: '1rem 0',
};

const ActionsHolder = ({ children }) => (
  <div style={holderStyle}>
    {children}
  </div>
);

ActionsHolder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ActionsHolder;
