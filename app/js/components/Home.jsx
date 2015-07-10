'use strict';
import {Navigation, RouteHandler} from 'react-router';
import sessionStore from '../stores/sessionStore';
import storeStore from '../stores/storeStore';
import Sidebar from './Sidebar';
import Header from './Header';

export default React.createClass({
  mixins:[Navigation],
  observers: [],

  getInitialState () {
    return {session:null};
  },

  componentDidMount () {
    this.addObservers()
    storeStore.update.onNext("54318d4064acfb0b3139807e"); // for now just load the store
  },

  addObservers () {
    this.observers.push(sessionStore
    .error
    .filter((error) => error)
    .subscribe(this.transitionTo.bind(this, 'login')));

    this.observers.push(
      sessionStore.store
        .filter(session => session && !session.user)
        .subscribe(this.transitionTo.bind(this, 'login')));

    this.observers.push(sessionStore
      .store
      .filter(session => session && session.user)
      .map((session) => {
        return {session}
      })
      .subscribe(this.setState.bind(this)));
  },

  componentWillUnmount () {
    this.observers.forEach((x) => x.dispose());
  },

  render: function () {
    return (
      <div>
        <Header/>
        <RouteHandler session={this.state.session} />
      </div>
    );
  }
});
