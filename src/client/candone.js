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
    icon: 'setting',
  },
  {
    id: 102,
    title: 'tasks',
    link: '/tasks',
    icon: 'browser',
  },
  {
    id: 103,
    title: 'notes',
    link: '/notes',
    icon: 'file text outline',
  },
  {
    id: 104,
    title: 'people',
    link: '/people',
    icon: 'users',
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
