'use strict';
import {Navigation} from 'react-router';
import LoginForm from './LoginForm.jsx';
import sessionContainer from '../containers/sessionContainer';

export default React.createClass({
  mixins:[Navigation],

  getInitialState() {
    return {error: null};
  },

  componentDidMount: function () {
    document.title = 'Sentia Analytics - Login';
    this.sessionObserver = sessionContainer.observable
      .skip(1)
      .tap(session => console.log('login session', R.keys(session)))
      .filter((session) => session && session.user)
      .subscribe(session => {
        this.transitionTo('dashboard', {id: '54318d4064acfb0b3139807e'});
      });

    this.errorObserver = sessionContainer
      .error
      .filter(x => !R.isNil(x))
      .tap(x => console.log('login error', x))
      .subscribe(error => this.setState({error}));
  },

  componentWillUnmount() {
    this.sessionObserver.dispose();
    this.errorObserver.dispose();
  },


  render: function () {
    let error = this.state.error;
    return (
      <div className="full-height container table">
        <LoginForm error={error}/>
      </div>
    );
  }
});
