'use strict';
import React from 'react';

export default React.createClass({
  componentDidMount: function () {
    document.title = 'Sentia Analytics - Dashboard';
  },
  render: function () {
    return (
      <div className="">
      <h1> Dashboard</h1>
      <p>{this.props.session}</p>
      <p>{this.props.error}</p>
      </div>
    );
  }
});
