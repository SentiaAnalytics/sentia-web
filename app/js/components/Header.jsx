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
              <Datepicker dateStore={startDateContainer} id="start-date-picker" classes=""/>
              <Datepicker dateStore={endDateContainer} id="end-date-picker"  classes=""/>
            </div>
        </div>
      </div>
    );
  }

});
