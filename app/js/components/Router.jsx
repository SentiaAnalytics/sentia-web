'use strict';
import Router from 'react-router';
import {Login} from './login';
import {App, Home} from './core';
import {Dashboard} from './dashboard';
let Route = Router.Route;

var routes =  (
  <Route name="app" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="home" handler={Home}>
      <Route name="dashboard" path="/" handler={Dashboard}/>
    </Route>
  </Route>
);
export function init () {
  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}
