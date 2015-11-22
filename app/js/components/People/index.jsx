import location from '../../services/location';
import {startDateContainer, endDateContainer} from '../../containers/dateContainer';
import peopleContainer from '../../containers/peopleContainer';
import Numberwidget from '../Numberwidget';
import Datepicker from '../Datepicker';

const model = Bacon.combineWith(
  (startDate, endDate, people) => ({startDate, endDate, people}),
  startDateContainer.observable,
  endDateContainer.observable,
  peopleContainer.observable
);

startDateContainer.observable
  .subscribe(logger.log('startDate'))

endDateContainer.observable
  .subscribe(logger.log('endDate'))

peopleContainer.observable
  .subscribe(logger.log('people'))

export default React.createClass({
  getInitialState () {
    return {};
  },

  componentDidMount () {
    this.dispose = model
      .map(logger.log('MODEL'))
      .onValue(this.replaceState.bind(this));
  },

  componentWillUnmount () {
    this.dispose();
  },

  render () {
    const {startDate, endDate, people} = this.state;
    const totalPeople = people ? R.sum(R.map(R.prop('people'), people)) : 0;

    return (
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="btn-group col-xs-8 col-sm-4 col-xs-offset-2 col-sm-offset-4 gutter-bottom gutter-top">
            <Datepicker
              container={startDateContainer}
              defaultValue={location.get('from')}
              className="btn btn-primary col-xs-6"
              id="start-date-picker"/>

            <Datepicker
              container={endDateContainer}
              defaultValue={location.get('to')}
              className="btn btn-primary col-xs-6"
              id="end-date-picker"/>
          </div>
        </div>

        <Numberwidget
          id="total-people"
          title="Total people in"
          value={totalPeople}/>
      </div>
    );
  }
});
