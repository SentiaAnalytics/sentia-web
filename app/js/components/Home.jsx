'use strict';
import location from '../services/location';
import {Navigation, RouteHandler} from 'react-router';
import sessionContainer from '../containers/sessionContainer';
import storeContainer from '../containers/storeContainer';
import Sidebar from './Sidebar';
import Header from './Header';

export default React.createClass({
  mixins:[Navigation],
  observers: [],
  getInitialState () {
    return {session:null};
  },

  componentDidMount () {
    console.log('HOME');
    this.addObservers()
    sessionContainer.observer.onNext({action: 'fetch'});
    storeContainer.observer.onNext(this.props.params.id); // for now just load the store
  },

  addObservers () {
    this.observers.push(sessionContainer
    .error
    .filter((error) => error)
    .subscribe(this.transitionTo.bind(this, 'login')));

    this.observers.push(
      sessionContainer.observable
        .filter(session => session && !session.user)
        .subscribe(this.transitionTo.bind(this, 'login')));

    this.observers.push(sessionContainer.observable
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
        <Header/>
        <RouteHandler session={this.state.session} />
      </div>
    );
  }
});
