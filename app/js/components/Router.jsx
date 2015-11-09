import {Router, Route, Redirect} from 'react-router';
import history from '../services/history';
import Login from './Login';
import App from './App';
import Home from './Home';
import Dashboard from './Dashboard';
import Compare from './Compare';
import Floors from './Floors';
import Camera from './Camera';
import People from './People';
import Cameralist from './Cameralist';

export default React.createClass({
  render () {
    return (
      <Router history={history}>
        <Route component={App}>
          <Route path="/login" component={Login}/>
          <Route component={Home}>
            <Route path="/stores/:storeId" component={Dashboard}/>
            <Route path="/stores/:storeId/floors" component={Floors}/>
            <Route path="/stores/:storeId/compare" component={Compare}/>
            <Route path="/stores/:storeId/cameras/:cameraId" component={Camera}/>
            <Route path="/stores/:storeId/cameras" component={Cameralist}/>
            <Route path="/stores/:storeId/people" component={People}/>
          </Route>
          <Redirect from="/" to="/stores/54318d4064acfb0b3139807e"/>
        </Route>
      </Router>
    );
  }
});
