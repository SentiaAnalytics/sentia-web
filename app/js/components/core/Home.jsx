'use strict';
import {Navigation, RouteHandler} from 'react-router';
import sessionStore from '../../stores/sessionStore';
import Sidebar from './Sidebar.jsx';

export default React.createClass({
  mixins:[Navigation],
  observers: [],

  getInitialState () {
    return {session:null};
  },

  componentDidMount () {
    console.log('MOUNT');
    this.observers.push(sessionStore
      .error
      .filter((error) => error)
      .subscribe(this.transitionTo.bind(this, 'login')));

    this.observers.push(sessionStore
      .store
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
      <RouteHandler session={this.state.session} />
    );
  }
});
