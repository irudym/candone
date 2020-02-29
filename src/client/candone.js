import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './components/sidebar';

const sideMenuItems = [
  {
    id: 100,
    title: 'candone',
    link: '/dashboard',
    icon: 'dashboard',
  },
  {
    id: 101,
    title: 'projects',
    link: '/projects',
    icon: 'projects',
  },
  {
    id: 102,
    title: 'tasks',
    link: '/tasks',
    icon: 'tasks',
  },
  {
    id: 103,
    title: 'notes',
    link: '/notes',
    icon: 'notes',
  },
  {
    id: 104,
    title: 'people',
    link: '/people',
    icon: 'contacts',
  },
];

const Candone = ({ children }) => (
  <div>
    <Sidebar menuItems={sideMenuItems} />
    {children}
  </div>
);

Candone.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Candone;
