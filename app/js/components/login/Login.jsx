'use strict';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import sessionStore from '../../stores/sessionStore';

export default React.createClass({
  mixins:[Navigation],

  componentDidMount: function () {
    document.title = 'Sentia Analytics - Login';
    sessionStore
      .session
      .filter((session) => session)
      .subscribe(this.transitionTo.bind(this, 'dashboard'));
  },


  render: function () {
    return (
      <div className="full-height container table">
        <LoginForm/>
      </div>
    );
  }
});
