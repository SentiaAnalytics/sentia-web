import React from 'react';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import * as sessionStore from '../../stores/sessionStore';
import * as sessionErrorStore from '../../stores/sessionErrorStore';

export default React.createClass({
  mixins:[Navigation],
  getInitialState: function () {
    return {}
  },

  componentDidMount: function () {
    sessionStore.onChange(this.handleChange);
    sessionErrorStore.onChange(this.handleError);
    document.title = 'Sentia Analytics - Login';
  },

  componentWillUnmount: function () {
    sessionStore.removeListener(this.handleChange);
    sessionErrorStore.removeListener(this.handleError);
  },

  handleChange: function () {
    let session = sessionStore.get();
    if (session.hasOwnProperty('user')) {
      return this.transitionTo('dashboard');
    }
  },

  handleError: function () {
    let error = sessionErrorStore.get();
    this.setState({error: error});
  },

  render: function () {
    return (
      <div className="full-height container table">
        <LoginForm/>

        <p className="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" id="loginerror">{this.state.error}</p>
      </div>
    );
  }
});
