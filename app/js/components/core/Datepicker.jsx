import React from 'react';
import ReactDatepicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({

  getInitialState: function () {
    return {open: true, docked: false};
  },

  render: function() {
    return (
        <ReactDatepicker/>
    );
  }
});
