'use strict';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import sessionStore from '../stores/sessionStore';

export default React.createClass({
  mixins:[Navigation],

  componentDidMount: function () {
    document.title = 'Sentia Analytics - Login';
    sessionStore
      .store
      .filter((session) => session && session.user)
      .subscribe(R.partial(this.transitionTo, 'dashboard'));
  },


  render: function () {
    return (
      <div className="full-height container table">
        <LoginForm/>
      </div>
    );
  }
});
