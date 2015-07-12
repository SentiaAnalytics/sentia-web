'use strict';
import Router from 'react-router';
import Login from './Login';
import App from './App';
import Home from './Home';
import Dashboard from './Dashboard';
let Route = Router.Route;
let Redirect = Router.Redirect;

var routes =  (
  <Route name="app" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="home" handler={Home}>
      <Route name="dashboard" path="/store/:id" handler={Dashboard}/>
    </Route>
    <Redirect from="/" to="/store/:id" params={{id: '54318d4064acfb0b3139807e'}}/>
  </Route>
);
export function init () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.body);
  });
}
