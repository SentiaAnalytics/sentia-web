'use strict';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import sessionStore from '../stores/sessionStore';

export default React.createClass({
  mixins:[Navigation],

  componentDidMount: function () {
    document.title = 'Sentia Analytics - Login';
    sessionStore
      .skip(1)
      .tap(session => console.log('login session', R.keys(session)))
      .filter((session) => session && session.user)
      .subscribe(session => {
        this.transitionTo('dashboard', {id: '54318d4064acfb0b3139807e'});
      });
  },


  render: function () {
    return (
      <div className="full-height container table">
        <LoginForm/>
      </div>
    );
  }
});
