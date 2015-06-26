'use strict';
import Datepicker from 'react-datepicker';

export default React.createClass({

  getInitialState: function () {
    return {open: true, docked: false};
  },

  render: function() {
    return (
      <div className="">
        <Datepicker
        start_date: moment()>
      </div>
    );
  }
});
