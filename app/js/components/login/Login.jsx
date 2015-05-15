import React from 'react';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import * as sessionStore from '../../stores/sessionStore';

export default React.createClass({
  mixins:[Navigation],

  componentDidMount: function () {
    sessionStore.onChange(this.handleChange);
  },

  componentWillUnmount: function () {
    sessionStore.removeListener(this.handleChange);
  },

  handleChange: function () {
    let session = sessionStore.get();
    if (session.hasOwnProperty('user')) {
      this.transitionTo('dashboard');
    }
  },

  render: function () {
    return (
      <div className="full-height container table">
        <LoginForm/>
      </div>
    );
  }
});
