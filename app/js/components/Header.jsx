'use strict';
import Datepicker from './Datepicker';
import startDateStore from '../stores/startDateStore';
import endDateStore from '../stores/endDateStore';

export default React.createClass({

  getInitialState: function () {
    return {open: true, docked: false};
  },

  render: function() {
    return (
      <div className="bg-gray navbar navbar-default">
        <div className="container-fluid">
          <form className="navbar-form navbar-left">
            <div className="form-group">
              <Datepicker dateStore={startDateStore}/>
              <Datepicker dateStore={endDateStore}/>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
