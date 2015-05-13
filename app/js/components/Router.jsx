'use strict';
import React from 'react';
import Router from 'react-router';
import {Login} from './login';
import {App, Home} from './core';
import {Dashboard} from './dashboard';
let Route = Router.Route;

var routes =  (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="home" handler={Home}>
      <Route name="dashboard" path="/dashboard" handler={Dashboard}/>
    </Route>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
