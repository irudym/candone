import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Modal from './modal';
import DeleteButton from './delete_button';
import CancelButton from './cancel_button';


const ConfirmationDialog = ({
  title,
  onConfirm,
  onCancel,
  show,
  children,
  icon,
}) => (
  <Modal dimmer="inverted" closeOnRootNodeClick={false} open={show} onClose={onCancel} size="small" title="Are you sure?" >
    <Modal.Content>
      <Icon name={icon} size="huge" color="red" />
      {title}
      {children}
    </Modal.Content>
    <Modal.Actions>
      <DeleteButton onClick={onConfirm} floated="right" />
      <CancelButton onClick={onCancel} />
    </Modal.Actions>
  </Modal>
);

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  icon: PropTypes.string,
};

ConfirmationDialog.defaultProps = {
  show: false,
  children: null,
  icon: 'trash alternate outline',
};

export default ConfirmationDialog;
