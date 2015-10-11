'use strict';
import {Link} from 'react-router';
import history from '../services/history';
import bindProps from '../util/bindProps';
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
      .onError(() => history.replaceState(null, '/login'));

    this.disposeLogout = sessionContainer.observable
        .map(logger.log('LOGOUT'))
        .filter(session => session && !session.user)
        .map(logger.log('LOGOUT FILTERED'))
        .onValue(() => history.replaceState(null, '/login'));

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
      let {startDate, endDate} = this.props.query || {};
    return (
      <div className="has-header-top full-height scroll-y relative">
        <Header/>
        <div className="full-height relative">
          <div className="has-sidebar scroll-y full-height">
            {bindProps({session: this.state.session}, this.props.children)}
          </div>
          <Sidebar storeId={this.props.params.storeId}/>
        </div>
      </div>
    );
  }
});
