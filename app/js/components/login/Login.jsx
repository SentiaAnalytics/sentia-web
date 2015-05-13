import React from 'react';
import LoginForm from './LoginForm.jsx';
import * as sessionStore from '../../stores/sessionStore';

export default class Login extends React.Component {

  componentDidMount () {
    sessionStore.onChange(event =>this.handleChange(event));
  }

  componentWillUnmount () {
    sessionStore.removeListener(this.handleChange);
  }

  handleChange () {

    let session = sessionStore.get();
    if (session.hasOwnProperty('user')) {
      this.context.router.transitionTo('dashboard');
    }
  }

  render () {
    return (
      <div className="full-height container table">
        <LoginForm/>
      </div>
    );
  }
}

Login.contextTypes= {
  router: React.PropTypes.func
};
