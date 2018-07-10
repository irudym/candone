import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './components/sidebar';

const sideMenuItems = [
  {
    id: 10,
    title: 'candone',
    link: '/dashboard',
    icon: 'dashboard',
  },
  {
    id: 100,
    title: 'tasks',
    link: '/table',
    icon: 'browser',
  },
  {
    id: 101,
    title: 'projects',
    link: '/projects',
    icon: 'setting',
  },
  {
    id: 102,
    title: 'people',
    link: '/people',
    icon: 'users',
  },
  {
    id: 103,
    title: 'notes',
    link: '/notes',
    icon: 'file text outline',
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
