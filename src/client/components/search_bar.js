import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SearchBar = ({ placeholder }) => (
  <Input icon="search" placeholder={placeholder} size="mini" fluid />
);

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default SearchBar;
