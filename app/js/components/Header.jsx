'use strict';
import sessionContainer from '../containers/sessionContainer';
import {startDateContainer, endDateContainer} from '../containers/dateContainer';
import Datepicker from './Datepicker';

export default React.createClass({
  render: function() {
    return (
      <div className="header navbar navbar-default bg-gray-light">
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
