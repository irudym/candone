import React from 'react';
import PropTypes from 'prop-types';


const headerStyle = {
  padding: '20px 0',
};


const Header = ({ children }) => (
  <div style={headerStyle}>
    {children}
  </div>
);

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Header;
