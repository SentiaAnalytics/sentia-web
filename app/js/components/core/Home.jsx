import React from 'react';
import {Navigation, RouteHandler} from 'react-router';
import * as sessionStore from '../../stores/sessionStore';
import dispatcher from '../../services/dispatcher';
import * as sessionErrorStore from '../../stores/sessionErrorStore';
import Sidebar from './Sidebar.jsx';
export default React.createClass({
  mixins:[Navigation],
  getInitialState: function () {
    return { session: sessionStore.get() };
  },

  componentDidMount: function () {
    sessionStore.onChange(this.sessionChangeHandler);
    sessionErrorStore.onChange(this.sessionErrorHandler);
    if (!sessionStore.get()) {
      dispatcher.dispatch({actionType: 'FETCH_SESSION'})
    }
  },

  componentWillUnmount: function () {
    sessionStore.removeListener(this.sessionChangeHandler);
    sessionErrorStore.onChange(this.sessionErrorHandler);
  },

  sessionChangeHandler: function () {
    this.setState({session: sessionStore.get()});
  },

  sessionErrorHandler: function () {
    return this.transitionTo('login');
  },

  render: function () {
    return (
      <div className="bg-gray-ligther">
        <h1>v0.0.23</h1>
        <RouteHandler session={this.state.session} />
      </div>
    );
  }
});
