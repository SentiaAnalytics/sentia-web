'use strict';
import React from 'react';

export default React.createClass({
  componentDidMount: function () {
    document.title = 'Sentia Analytics - Dashboard';
  },
  render: function () {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="container-fluid">
          <article className="widget col-sm-6">
            <h1>revenue</h1>
            <p>1.323.923</p>
          </article>
        </div>
      </div>
    );
  }
});
