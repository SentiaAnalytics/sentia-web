'use strict';
import Router from 'react-router';
import Login from './Login';
import App from './App';
import Home from './Home';
import Dashboard from './Dashboard';
import Compare from './Compare';
import Floors from './Floors';
import Camera from './Camera';
import Cameralist from './Cameralist';
let Route = Router.Route;
let Redirect = Router.Redirect;

var routes =  (
  <Route name="app" handler={App}>
    <Route name="login" path="/login" handler={Login}/>
    <Route name="home" handler={Home}>
      <Route name="dashboard" path="/stores/:storeId" handler={Dashboard}/>
      <Route name="floors" path="/stores/:storeId/floors" handler={Floors}/>
      <Route name="compare" path="/stores/:storeId/compare" handler={Compare}/>
      <Route name="camera" path="/stores/:storeId/cameras/:cameraId" handler={Camera}/>
      <Route name="cameras" path="/stores/:storeId/cameras" handler={Cameralist}/>
    </Route>
    <Redirect from="/" to="/stores/:storeId" params={{storeId: '54318d4064acfb0b3139807e'}}/>
  </Route>
);
export function init () {
  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
  });
}
