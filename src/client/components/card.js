import React from 'react';
import { PropTypes } from 'prop-types';
import { Card as SemanticCard, Button, Icon } from 'semantic-ui-react';

import { elements } from '../styles/colors';

const cardStyle = (selected) => {
  const shadow = {
    boxShadow: '2px 1px 7px 2px rgba(0,0,0,0.20)',
  };
  return selected ? { ...shadow, border: `2px solid ${elements.selected}` } : shadow;
};

const contentStyle = {
  marginLeft: '40px',
};

const headerStyle = {
  fontFamily: 'Roboto',
  fontWeight: 500,
  color: elements.title,
  fontSize: '1rem',
};

const typeLineStyle = color => ({
  position: 'absolute',
  top: '1rem',
  bottom: '1rem',
  left: '36px',
  width: 3,
  background: color,
  zIndex: 2,
  padding: 1,
  borderRadius: 5,
});

const deleteButtonStyle = {
  position: 'absolute',
  left: -10,
  bottom: 0,
  background: 'transparent',
  fontSize: '1.5rem',
  // display: 'none',
  opacity: 0,
  transitionDuration: '0.5s',
};

const dateStyle = {
  marginTop: '1rem',
  fontFamily: 'Roboto',
  fontWeight: 500,
  fontSize: '0.8rem',
  color: elements.description,
};

const descriptionStyle = {
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '0.86rem',
  color: elements.description,
};

const CardContent = ({ children, color, onDelete }) => (
  <SemanticCard.Content style={contentStyle}>
    <div className="type-line" style={typeLineStyle(color)} />
    <Button className="delete-icon" icon float="right" onClick={(e) => { e.stopPropagation(); onDelete(); }} style={deleteButtonStyle}>
      <Icon name="trash" />
    </Button>
    {children}
  </SemanticCard.Content>
);

const CardHeader = ({ children }) => (
  <SemanticCard.Header style={headerStyle}>
    {children}
  </SemanticCard.Header>
);

const CardMeta = ({ children }) => (
  <SemanticCard.Meta style={dateStyle}>
    {children}
  </SemanticCard.Meta>
);

const CardDescription = ({ children }) => (
  <SemanticCard.Description style={descriptionStyle}>
    {children}
  </SemanticCard.Description>
);

class Card extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    /** Primary content. */
    children: PropTypes.node.isRequired,
    selected: PropTypes.bool,
  }

  static defaultProps = {
    selected: false,
  }

  static Content = CardContent;
  static Header = CardHeader;
  static Meta = CardMeta;
  static Description = CardDescription;


  render() {
    const { onClick, children, selected } = this.props;

    return (
      <SemanticCard fluid onClick={onClick} style={cardStyle(selected)} className="candone-card">
        {children}
      </SemanticCard>
    );
  }
}

export default Card;
