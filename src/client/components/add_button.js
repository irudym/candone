import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
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


const AddButton = ({ title, onClick, style, noicon }) => {
  let article = 'a';
  if (title.toUpperCase().charAt(0) === 'A' || title.toUpperCase().charAt(0) === 'E') article = 'an';
  return (
    <Button onClick={onClick} style={{ ...buttonStyle, ...style }} className="candone-button">
      {
        noicon ?
        null
        :
        <Icon name="plus" color={buttonStyle.color} />
      }
      Add {`${article} ${title}`}
    </Button>
  );
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  noicon: PropTypes.bool,
};


AddButton.defaultProps = {
  style: {},
  noicon: false,
};

export default AddButton;
