import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { elements } from '../styles/colors';

const buttonStyle = {
  borderRadius: 3,
  background: elements.okButton,
  color: elements.buttonCaption,
  fontSize: '1.14rem',
  fontFamily: 'Roboto',
  fontWeight: 400,
  border: `1px solid ${elements.okButtonBorder}`,
};


const AddButton = ({ title, onClick }) => {
  let article = 'a';
  if (title.toUpperCase().charAt(0) === 'A' || title.toUpperCase().charAt(0) === 'E') article = 'an';
  return (
    <Button onClick={onClick} style={buttonStyle} className="candone-button">
      <Icon name="plus" color={buttonStyle.color} />
      Add {`${article} ${title}`}
    </Button>
  );
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
