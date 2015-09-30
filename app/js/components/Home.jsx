'use strict';
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
    this.disposeError = sessionContainer
      .observable
      .onError(this.transitionTo.bind(this, 'login'));

    this.disposeLogout = sessionContainer.observable
        .filter(session => session && !session.user)
        .onValue(() => this.transitionTo('login'));

    this.disposeSession = sessionContainer.observable
      .filter(session => session && session.user)
      .map((session) => ({session}))
      .onValue(session => this.setState(session));

    sessionContainer.observer.push({action: 'fetch'});
    storeContainer.observer.push(this.props.params.storeId); // for now just load the store
  },

  componentWillUnmount () {
    this.disposeError();
    this.disposeSession();
    this.disposeLogout();
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
