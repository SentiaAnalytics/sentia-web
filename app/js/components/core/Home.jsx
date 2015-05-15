import React from 'react';
import {RouteHandler} from 'react-router';
// import sessionStore from '../../stores/sessionStore';
// import sessionErrorStore from '../../stores/sessionErrorStore';
export default React.createClass({
  // componentDidMount () {
  //   sessionStore.onChange(event => this.onSessionChange(event));
  //   sessionErrorStore.onChange(event => this.onSessionError(event));
  // }
  // componentWillUnmount () {
  //   sessionStore.removeListener(event => this.onSessionChange(event));
  //   sessionErrorStore.onChange(event => this.onSessionError(event));
  // }
  render:() => {
    return (
      <RouteHandler/>
    );
  }
});
