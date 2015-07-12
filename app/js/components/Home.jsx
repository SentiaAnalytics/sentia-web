'use strict';
import location from '../services/location';
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
    sessionStore.update.onNext({action: 'fetch'});
    storeStore.update.onNext(this.props.params.id); // for now just load the store
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
      let {startDate, endDate} = this.props.query;
    return (
      <div>
        <Header startDate={startDate} endDate={endDate}/>
        <RouteHandler session={this.state.session} />
      </div>
    );
  }
});
