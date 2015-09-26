'use strict';
import {startDateContainer, endDateContainer} from '../containers/dateContainer';
import posContainer from '../containers/posContainer';
import peopleContainer from '../containers/peopleContainer';
import churnrateContainer from '../containers/churnrateContainer';
import queueContainer from '../containers/queueContainer';
import util from '../util';
import FeatureToggle from './FeatureToggle';
import Datepicker from './Datepicker';
import Linechart from './Linechart';
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

          <div className="col-sm-6 gutter-bottom">
            <div className="paper panel-body">
              <span className="h2 block" style={{color:colors[0]}}>Group 1</span>
              <div className="btn-group">
                <Datepicker dateStore={startDateContainer} id="start-date-picker" classes=""/>
                <Datepicker dateStore={endDateContainer} id="end-date-picker"  classes=""/>
              </div>
            </div>
          </div>

          <div className="col-sm-6 gutter-bottom">
            <div className="paper panel-body">
              <span className="h2 block" style={{color:colors[1]}}>Group 2</span>
              <div className="btn-group">
                <Datepicker dateStore={startDateContainer} id="start-date-picker" classes=""/>
                <Datepicker dateStore={endDateContainer} id="end-date-picker"  classes=""/>
              </div>
            </div>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>People</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={people} prop="people" id="total-people" title="people" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={people} prop="people" id="total-people" title="people" className="paper" color={colors[1]}/>
              </div>
            </div>
            <article className="paper-widget paper">
              <Linechart observable={people} type="people" title="People" options={{colors: [colors[0]]}}/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Revenue</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={revenue} prop="revenue" id="total-revenue" title="revenue" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={revenue} prop="revenue" id="total-revenue" title="revenue" className="paper" color={colors[1]}/>
              </div>
            </div>
            <article className="paper-widget paper">
              <Linechart observable={revenue} type="revenue" title="Revenue" options={{colors: [colors[0]]}}/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Transactions</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={transactions} prop="transactions" id="total-transactions" title="transactions" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={transactions} prop="transactions" id="total-transactions" title="transactions" className="paper" color={colors[1]}/>
              </div>
            </div>
            <article className="paper-widget paper">
              <Linechart observable={transactions} type="transactions" title="Transactions" options={{colors: [colors[0]]}}/>
            </article>
          </div>

          <FeatureToggle prop="toggleQueues" value="true">
            <div className="col-xs-12 gutter-bottom">
              <h2>Queues</h2>
              <div className="col-sm-6 gutter-bottom">
                <Average observable={queue} prop="queue" id="total-queue" title="Average Queue Time" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Average observable={queue} prop="queue" id="total-queue" title="Average Queue Time" className="paper" color={colors[1]}/>
              </div>
              <div className="col-xs-12">
                <article className="paper-widget paper">
                  <Linechart observable={queue} type="queue" title="" options={{colors: [colors[0]]}}/>
                </article>
              </div>
            </div>
          </FeatureToggle>

        </div>
      </div>
    );
  }
});
