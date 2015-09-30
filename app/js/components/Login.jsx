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
    this.disposeSession = sessionContainer
      .observable
      .filter(session => session && session.user)
      .map(logger.log('LOGGED IN'))
      .onValue(session => {
        this.transitionTo('dashboard', {storeId: '54318d4064acfb0b3139807e'});// TIGER SPECIFIC
      });

    this.disposeError = sessionContainer
      .observable
      .filter(x => !R.isNil(x))
      .filter(x => x !== 'You must login to perform this action.')
      .onError(error => this.setState({error: error.data}));
  },

  componentWillUnmount() {
    this.disposeSession();
    this.disposeError();
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
