'use strict';
import startDateStore from '../stores/startDateStore';
import endDateStore from '../stores/endDateStore';
import posStore from '../stores/posStore';
import peopleStore from '../stores/peopleStore';
import util from '../util';
import Linechart from './Linechart';

export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      pos:posStore.store.getValue(),
      dates: {
        startDate: startDateStore.store.getValue(),
        endDate: endDateStore.store.getValue()
      }
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Dashboard';
    this.observer = rx.Observable.combineLatest(
        startDateStore.store,
        endDateStore.store,
        posStore.store,
        peopleStore.store,
        (startDate, endDate, pos, people) => {
          return{
            dates: {
              startDate,
              endDate
            },
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
    const {dates, pos, people} = this.state;
    let totalRevenue = pos? util.sumProp('revenue', pos): 0;
    let totalTransactions = pos? util.sumProp('transactions', pos): 0;
    let basketSize = util.round(2, totalRevenue/totalTransactions);
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>date</h1>
              <p>{dates.startDate.format('MMM Do YYYY')}</p>
              <p>{dates.endDate.format('MMM Do YYYY')}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>revenue</h1>
              <p id="total-revenue">{totalRevenue}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>transactions</h1>
              <p id="total-transactions">{totalTransactions}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>Basket size</h1>
              <p id="basket-size">{basketSize}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>people in</h1>
              <p id="total-revenue">{people && util.sumProp('people', people)}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget container-fluid">
              <Linechart store={posStore.store} type="revenue"/>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget container-fluid">
              <Linechart store={posStore.store} type="transactions"/>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget container-fluid">
              <Linechart store={peopleStore.store} type="people"/>
            </article>
          </div>
        </div>
      </div>
    );
  }
});
