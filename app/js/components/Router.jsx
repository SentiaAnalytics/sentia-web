'use strict';
import React from 'react';
import Router from 'react-router';
import App from './App.jsx';
import {Login} from './login';
let Route = Router.Route;

var routes =  (
  <Route name="app" path="/" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
