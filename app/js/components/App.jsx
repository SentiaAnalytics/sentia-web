'use strict';
import {RouteHandler} from 'react-router';
import sessionStore from '../stores/sessionStore';
export default React.createClass({
  componentDidMount () {
    sessionStore.update.onNext({action: 'fetch'});
  },
  render () {
    return (
      <RouteHandler/>
    );
  }
});
