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
          <div className="col-xs-3 no-gutter">
            <Datepicker date={startDate} maxDate={endDate} dateStore={startDateStore} id="start-date-picker" classes="navbar-btn btn-block"/>
          </div>
          <div className="col-xs-3 no-gutter">
            <Datepicker date={endDate} minDate={startDate}  dateStore={endDateStore} id="end-date-picker"  classes="navbar-btn btn-block"/>
          </div>
            <button className="pull-right btn navbar-btn btn-danger" onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  },
  logout () {
    sessionStore.update.onNext({action: 'logout'});
  }

});
