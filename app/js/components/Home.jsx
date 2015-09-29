'use strict';
import location from '../services/location';
import {Link} from 'react-router';
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
    this.errorDisposable = sessionContainer
      .error
      .filter((error) => error)
      .tap(logger.log('ERROR DISPOSABLE'))
      .subscribe(this.transitionTo.bind(this, 'login'));

    this.logoutDisposable = sessionContainer.observable
        .tap(logger.log('LOGOUT DISPOSABLE'))
        .filter(session => session && session.user === undefined)
        .subscribe(() => this.transitionTo('login'));

    this.sessionDisposable = sessionContainer.observable
      .tap(logger.log('SESSION DISPOSABLE'))
      .filter(session => session && session.user)
      .map((session) => ({session}))
      .subscribe(session => this.setState(session));

    sessionContainer.observer.onNext({action: 'fetch'});
    storeContainer.observer.onNext(this.props.params.storeId); // for now just load the store
  },

  componentWillUnmount () {
    console.log('DISPOSE');
    this.errorDisposable.dispose();
    this.sessionDisposable.dispose();
    this.logoutDisposable.dispose();
  },

  render: function () {
      let {startDate, endDate} = this.props.query;
    return (
      <div className="has-header-top full-height scroll-y relative">
        <Header/>
        <div className="full-height relative">
          <div className="has-sidebar scroll-y full-height">
            <RouteHandler session={this.state.session} />
          </div>
          <Sidebar storeId={this.props.params.storeId}/>
        </div>
      </div>
    );
  }
});
