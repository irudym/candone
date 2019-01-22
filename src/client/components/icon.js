import React from 'react';
import { PropTypes } from 'prop-types';

import Dashboard, { ReactComponent as DashboardSVG } from '../../assets/icons/Dashboard.svg';
import Notes, { ReactComponent as NotesSVG } from '../../assets/icons/Notes.svg';
import Projects, { ReactComponent as ProjectsSVG } from '../../assets/icons/Projects.svg';
import Tasks, { ReactComponent as TasksSVG } from '../../assets/icons/Tasks.svg';


const icons = {
  'dashboard': DashboardSVG,
  'notes': NotesSVG,
  'projects': ProjectsSVG,
  'tasks': TasksSVG,
};


/*
export const Icon = ({ name }) => (
  <div className="candone-icon">
    <img src={icons[name]} alt={name} />
  </div>
);
*/
export const Icon = ({ name }) => {
  const SVGComponent = icons[name];
  if (SVGComponent) {
    console.log("ICON: ", SVGComponent);
    return (
      <SVGComponent className="candone-icon" />
    );
  }
  return null;
};


Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
