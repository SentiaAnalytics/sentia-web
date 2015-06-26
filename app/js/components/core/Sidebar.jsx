'use strict';
export default React.createClass({

  getInitialState: function () {
    return {open: true, docked: false};
  },

  render: function() {
    return (
      <div className="sidebar open">
        <b>Sidebar content</b>
      </div>
    );
  }
});
