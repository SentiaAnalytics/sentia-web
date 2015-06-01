import React from 'react';
import {RouteHandler} from 'react-router';
import * as sessionStore from '../../stores/sessionStore';
import * as sessionErrorStore from '../../stores/sessionErrorStore';
import Sidebar from './Sidebar.jsx';
export default React.createClass({

  getInitialState: function () {
    return {
      session: sessionStore.get(),
      error: sessionErrorStore.get()
    };
  },

  componentDidMount: function () {
    sessionStore.onChange(this.sessionChangeHandler);
    sessionErrorStore.onChange(this.sessionErrorHandler);
  },

  componentWillUnmount: function () {
    sessionStore.removeListener(this.sessionChangeHandler);
    sessionErrorStore.onChange(this.sessionErrorHandler);
  },

  sessionChangeHandler: function () {
    this.setState({session: sessionStore.get()});
  },

  sessionErrorHandler: function () {
    this.setState({
      session: sessionStore.get(),
      error: sessionErrorStore.get()
    });
  },

  render: function () {
    return (
      <div className="bg-gray-ligther">
        <Sidebar session={this.state.session} open={true}/>
        <h1>v0.0.10</h1>
        <RouteHandler session={this.state.session} error={this.state.error}/>
      </div>
    );
  }
});
