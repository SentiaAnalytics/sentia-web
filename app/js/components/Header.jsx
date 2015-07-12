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
    let {startDate, endDate} = this.props;
    console.log(this.props);
    return (
      <div className="bg-gray navbar navbar-default">
        <div className="container-fluid">
            <Datepicker date={startDate} maxDate={endDate} dateStore={startDateStore} id="start-date-picker" classes="navbar-btn"/>
            <Datepicker date={endDate} minDate={startDate}  dateStore={endDateStore} id="end-date-picker"/>
            <button className="pull-right btn navbar-btn btn-danger" onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  },
  logout () {
    sessionStore.update.onNext({action: 'logout'});
  }

});
