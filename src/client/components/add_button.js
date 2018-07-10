import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';


const AddButton = ({ title, onClick }) => {
  let article = 'a';
  if (title.toUpperCase().charAt(0) === 'A' || title.toUpperCase().charAt(0) === 'E') article = 'an';
  return (
    <Button onClick={onClick} >
      <Icon name="plus" />
      Add {`${article} ${title}`}
    </Button>
  );
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
