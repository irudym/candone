import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: elements.deleteButton,
  color: elements.buttonCaption,
  fontSize: elements.buttonFontSize,
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.deleteButtonBorder}`,
};


const DeleteButton = ({ title, onClick, style, floated }) => (
  <Button floated={floated} onClick={onClick} style={{ ...style, ...buttonStyle }} className="candone-delete-button">
    {title}
  </Button>
);

DeleteButton.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  floated: PropTypes.string,
};

DeleteButton.defaultProps = {
  title: 'Delete',
  style: {},
  floated: 'left',
};

export default DeleteButton;
