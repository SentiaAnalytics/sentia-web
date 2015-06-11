import React from 'react';
import ReactDatepicker from 'react-datepicker';
import moment from 'moment';

export default React.createClass({

  getInitialState: function () {
    return {
      start_date: moment(),
      end
    };
  },

  render: function() {
    return (
        <ReactDatepicker/>
    );
  }
});
