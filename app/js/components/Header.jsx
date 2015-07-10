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
            <Datepicker dateStore={startDateStore} id="start-date-picker" classes="navbar-btn"/>
            <Datepicker dateStore={endDateStore} id="end-date-picker"/>
            <button className="pull-right navbar-btn btn-danger" onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  },
  logout () {
    sessionStore.update.onNext({action: 'logout'});
  }

});
