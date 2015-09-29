'use strict';
import testingGroupFactory from '../services/testingGroupFactory';
import {round} from '../util';
import FeatureToggle from './FeatureToggle';
import Datepicker from './Datepicker';
import Linechart from './Linechart';
import AreaChart from './AreaChart';
import Total from './Total';
import Average from './Average';
import Percent from './Percent';

const colors = [
  '#36a3ff',
  '#64bd63',
  '#6D35E9',
  '#dd5826',
];
const group1 = testingGroupFactory();
const group2 = testingGroupFactory();

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
                <Datepicker container={group1.startDateContainer} id="start-date-picker" classes=""/>
                <Datepicker container={group1.endDateContainer} id="end-date-picker"  classes=""/>
              </div>
            </div>
          </div>

          <div className="col-sm-6 gutter-bottom">
            <div className="paper panel-body">
              <span className="h2 block" style={{color:colors[1]}}>Group 2</span>
              <div className="btn-group">
                <Datepicker container={group2.startDateContainer} id="start-date-picker" classes=""/>
                <Datepicker container={group2.endDateContainer} id="end-date-picker"  classes=""/>
              </div>
            </div>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>People</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group1.people} prop="people" id="group1-total-people" title="people" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group2.people} prop="people" id="group2-total-people" title="people" className="paper" color={colors[1]}/>
              </div>
            </div>
            <div className="row">
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper">
                  <Linechart observable={group1.people} type="people" title="People" options={{colors: [colors[0]]}}/>
                </article>
              </div>
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper">
                  <Linechart observable={group2.people} type="people" title="People" options={{colors: [colors[1]]}}/>
                </article>
              </div>
            </div>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Revenue</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group1.revenue} prop="revenue" id="group1-total-revenue" title="revenue" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group2.revenue} prop="revenue" id="group2-total-revenue" title="revenue" className="paper" color={colors[1]}/>
              </div>
            </div>
            <div className="row">
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper">
                    <Linechart observable={group1.revenue} type="revenue" options={{colors: [colors[0]]}}/>
                </article>
              </div>
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper">
                    <Linechart observable={group2.revenue} type="revenue" options={{colors: [colors[1]]}}/>
                </article>
              </div>
            </div>

          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Transactions</h2>
            <div className="row clearfix">
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group1.transactions} prop="transactions" id="group1-total-transactions" title="transactions" className="paper" color={colors[0]}/>
              </div>
              <div className="col-sm-6 gutter-bottom">
                <Total observable={group2.transactions} prop="transactions" id="group2-total-transactions" title="transactions" className="paper" color={colors[1]}/>
              </div>
            </div>

            <div className="row">
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper gutter-bottom">
                  <Linechart observable={group1.transactions} type="transactions" title="Transactions" options={{colors: [colors[0]]}}/>
                </article>
              </div>
              <div className="gutter-bottom col-sm-6">
                <article className="paper-widget paper gutter-bottom">
                  <Linechart observable={group2.transactions} type="transactions" title="Transactions" options={{colors: [colors[1]]}}/>
                </article>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
});
