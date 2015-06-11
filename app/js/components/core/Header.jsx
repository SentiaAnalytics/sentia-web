import React from 'react';
import Datepicker from 'react-datepicker';
import moment from 'moment';

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
