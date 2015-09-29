'use strict';
import {startDateContainer, endDateContainer} from '../containers/dateContainer';
import posContainer from '../containers/posContainer';
import peopleContainer from '../containers/peopleContainer';
import churnrateContainer from '../containers/churnrateContainer';
import queueContainer from '../containers/queueContainer';
import util from '../util';
import FeatureToggle from './FeatureToggle';
import Linechart from './Linechart';
import Datepicker from './Datepicker';
import Total from './Total';
import Average from './Average';
import Percent from './Percent';

const colors = [
  '#36a3ff',
  '#64bd63',
  '#6D35E9',
  '#dd5826',
];


const revenue = posContainer.observable
  .map(R.map(R.props(['time', 'revenue'])));

const transactions = posContainer.observable
  .map(R.map(R.props(['time', 'transactions'])));

const people = peopleContainer.observable
  .map(R.map(R.props(['time', 'people'])));

const queue = queueContainer.observable
  .tap(logger.log('queye dash'))
  .map(R.map(R.props(['time', 'queue'])));

export default React.createClass({
  componentDidMount () {
    document.title = 'Sentia Analytics - Dashboard';
  },

  render () {
    return (
      <div className="gutter-top gutter-bottom">
        <div className="container-fluid">
          <div className="btn-group col-xs-8 col-sm-4 col-xs-offset-2 col-sm-offset-4 gutter-bottom">
            <Datepicker container={startDateContainer} className="btn btn-primary col-xs-6" id="start-date-picker"/>
            <Datepicker container={endDateContainer} className="btn btn-primary col-xs-6" id="end-date-picker"/>
          </div>

          <div className="col-md-6 gutter-bottom">
            <div className="row">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={people} prop="people" id="total-people" title="people" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={revenue} prop="revenue" id="total-revenue" title="revenue" className="paper" color={colors[1]}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 gutter-bottom">
            <div className="row">
              <div className="col-sm-6 gutter-bottom">
                <Percent dividend={revenue} divisor={transactions} id="basket-size" title="Basket Size" suffix="DKK" className="paper" color={colors[2]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Percent dividend={transactions} divisor={people} id="conversion" title="Conversion Rate" suffix="%" className="paper" color={colors[3]}/>
              </div>
            </div>

          </div>


          <div className="col-xs-12 gutter-bottom">
            <h2>People</h2>
            <article className="paper-widget paper">
              <Linechart observable={people} type="people" title="People" options={{colors: [colors[0]]}}/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Revenue</h2>
            <article className="paper-widget paper">
              <Linechart observable={revenue} type="revenue" title="Revenue" options={{colors: [colors[1]]}}/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Transactions</h2>
            <article className="paper-widget paper">
              <Linechart observable={transactions} type="transactions" title="Transactions" options={{colors: [colors[2]]}}/>
            </article>
          </div>

          <FeatureToggle prop="toggleQueues" value="true">
            <div className="col-xs-12 gutter-bottom">
              <h2>Queues</h2>
              <div className="col-xs-12 gutter-bottom">
                <Average observable={queue} prop="queue" id="total-queue" title="Average Queue Time" className="paper" color={colors[3]}/>
              </div>
              <div className="col-xs-12">
                <article className="paper-widget paper">
                  <Linechart observable={queue} type="queue" title="" options={{colors: [colors[3]]}}/>
                </article>
              </div>
            </div>
          </FeatureToggle>
        </div>
      </div>
    );
  }
});
