'use strict';
import ReactDatepicker from 'react-datepicker';

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
