'use strict';
import sessionContainer from '../containers/sessionContainer';
import startDateContainer from '../containers/startDateContainer';
import endDateContainer from '../containers/endDateContainer';
import Datepicker from './Datepicker';

export default React.createClass({


  render: function() {
    return (
      <div className="header paper navbar navbar-default">
        <div className="container-fluid">
            <div className="btn-group pull-right navbar-btn">
              <button className="btn btn-primary icon icon-chevron-left"></button>
              <Datepicker dateStore={startDateContainer} id="start-date-picker" classes=""/>
              <Datepicker dateStore={endDateContainer} id="end-date-picker"  classes=""/>
              <button className="btn btn-primary icon icon-chevron-right"></button>
            </div>
        </div>
      </div>
    );
  }

});
