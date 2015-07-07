'use strict';
import Datepicker from './Datepicker';
import startDateStore from '../stores/startDateStore';
import endDateStore from '../stores/endDateStore';
import sessionStore from '../stores/sessionStore';

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
              <Datepicker dateStore={startDateStore} id="start-date-picker"/>
              <Datepicker dateStore={endDateStore} id="end-date-picker"/>
            </div>
          </form>
          <button className="pull-right btn btn-danger" onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  },
  logout () {
    sessionStore.update.onNext({action: 'logout'});
  }

});
