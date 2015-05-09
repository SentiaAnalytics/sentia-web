import React from 'react';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {message: 'hello'};
  }
  render () {
    return (
      <h1>{this.state.message}</h1>
    );
  }
}
