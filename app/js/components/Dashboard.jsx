'use strict';
import startDateStore from '../stores/startDateStore';
import endDateStore from '../stores/endDateStore';
import posStore from '../stores/posStore';
import peopleStore from '../stores/peopleStore';
import util from '../util';
import Datepicker from './Datepicker';
import Linechart from './Linechart';
import Numberwidget from './Numberwidget';

export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      pos:posStore.getValue(),
      startDate: startDateStore.getValue(),
      endDate: endDateStore.getValue()
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Dashboard';
    this.observer = rx.Observable.combineLatest(
        startDateStore,
        endDateStore,
        posStore,
        peopleStore,
        (startDate, endDate, pos, people) => {
          return{
            startDate,
            endDate,
            pos,
            people
          };
        })
      .subscribe(this.setState.bind(this));

  },

  componentWillUnmount () {
    this.observer.dispose();
  },

  render () {
    const {startDate, endDate, pos, people} = this.state;
    let totalRevenue = pos? util.sumProp('revenue', pos): 0;
    let totalTransactions = pos? util.sumProp('transactions', pos): 0;
    let totalPeople = people? util.sumProp('people', people): 0;
    let basketSize = util.round(2, totalRevenue/totalTransactions);
    let conversion = util.round(2, totalTransactions/totalPeople);
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <div className="col-sm-12 gutter-bottom">
            <div className="btn-group">
              <button className="btn btn-primary icon icon-chevron-left"></button>
              <Datepicker dateStore={startDateStore} id="start-date-picker" classes=""/>
              <Datepicker dateStore={endDateStore} id="end-date-picker"  classes=""/>
              <button className="btn btn-primary icon icon-chevron-right"></button>
            </div>
          </div>

          <div className="col-sm-12 gutter-bottom">
            <Numberwidget id="total-revenue" title="revenue" value={totalRevenue}/>
          </div>
          <div className="col-sm-12 gutter-bottom">
            <article className="paper paper-widget chart-primary">
              <Linechart store={posStore} type="revenue"/>
            </article>
          </div>
          <div className="col-sm-6">
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Numberwidget id="total-people" title="Peope in" value={totalPeople}/>
            </div>
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Numberwidget id="conversion" title="Conversion Rate" value={conversion}/>
            </div>
            <div className="col-xs-12 gutter-bottom">
              <article className="paper paper-widget chart-secondary">
                <Linechart store={posStore} type="transactions"/>
              </article>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Numberwidget id="total-transactions" title="transactions" value={totalTransactions}/>
            </div>
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Numberwidget id="basket-size" title="Basket Size" value={basketSize}/>
            </div>

            <div className="col-xs-12 gutter-bottom">
              <article className="paper paper-widget chart-tertiary">
                <Linechart store={peopleStore} type="people"/>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
