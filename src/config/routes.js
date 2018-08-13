import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Candone from '../client/candone';
import Tasks from '../client/tasks';
import People from '../client/people';
import Projects from '../client/projects';
import Notes from '../client/notes';
import Dashboard from '../client/dashboard';


export const routes = (
  <Candone>
    <Route exact path="/" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/tasks" component={Tasks} />
    <Route path="/projects" component={Projects} />
    <Route path="/people" component={People} />
    <Route path="/notes" component={Notes} />
  </Candone>
);
