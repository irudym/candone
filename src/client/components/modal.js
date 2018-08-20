import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SemanticModal, Icon } from 'semantic-ui-react';

import { elements } from '../styles/colors';

const headerStyle = {
  background: elements.header,
  fontFamily: 'Lato',
  fontSize: '1.5rem',
  fontWeight: 400,
};

const actionsStyle = {
  background: elements.header,
}

const closeButtonStyle = {
  position: 'absolute',
  top: 15,
  right: 10,
}

const closeButtonIconStyle = {
  color: elements.closeButton,
  cursor: 'pointer',
};

const ModalHeader = ({ children, onClose }) => (
  <SemanticModal.Header style={headerStyle}>
    <div style={closeButtonStyle} onClick={onClose}>
      <Icon className="candone-close-button" name="cancel" style={closeButtonIconStyle} />
    </div>
    {children}
  </SemanticModal.Header>
);

const ModalContent = ({ children }) => (
  <SemanticModal.Content>
    {children}
  </SemanticModal.Content>
);

const ModalActions = ({ children }) => (
  <SemanticModal.Actions style={actionsStyle}>
    {children}
  </SemanticModal.Actions>
);

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static Header = ModalHeader;
  static Content = ModalContent;
  static Actions = ModalActions;

  render() {
    return (
      <SemanticModal {...this.props}>
        <ModalHeader onClose={this.props.onClose}>
          {this.props.title}
        </ModalHeader>
        {this.props.children}
      </SemanticModal>
    );
  }
}

export default Modal;
