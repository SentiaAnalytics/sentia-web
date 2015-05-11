import React from 'react';
import LoginForm from './LoginForm.jsx';
import * as sessionStore from '../../stores/sessionStore';

export default class Login extends React.Component {
  contextTypes: {
    router: React.PropTypes.func
  }
  
  componentDidMount () {
    sessionStore.onChange(this.handleChange);
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
      <div className="full-height container">
        <LoginForm/>
      </div>
    );
  }
}