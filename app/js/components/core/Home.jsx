'use strict';
import {Navigation, RouteHandler} from 'react-router';
import dispatcher from '../../services/dispatcher';
import sessionStore from '../../stores/sessionStore';
import Sidebar from './Sidebar.jsx';

export default React.createClass({
  mixins:[Navigation],

  getInitialState () {
    return {session:null};
  },

  componentDidMount () {
    console.log('MOUNT');
    this.sessionErrorObserver = sessionStore
      .errors
      .filter((error) => error)
      .subscribe(this.transitionTo.bind(this, 'login'));

    this.sessionObserver = sessionStore
      .session
      .map((session) => {
        return {session}
      })
      .subscribe(this.setState.bind(this));
    if (!sessionStore.session.getValue()) {
      console.log('fetch session');
      sessionStore.update.onNext({
        type: 'FETCH_SESSION'
      });
    }

  },

  componentWillUnmount () {
    console.log('DISPOSE');
    this.sessionErrorObserver.dispose();
    this.sessionObserver.dispose();
  },

  render: function () {
    return (
      <RouteHandler session={this.state.session} />
    );
  }
});
