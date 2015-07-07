'use strict';
import startDateStore from '../stores/startDateStore';
import endDateStore from '../stores/endDateStore';
import posStore from '../stores/posStore';
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
        (startDate, endDate, pos) => {
          return{
            dates: {
              startDate,
              endDate
            },
            pos
          };
        })
      .subscribe(this.setState.bind(this));

  },

  componentWillUnmount () {
    this.observer.dispose();
  },

  render () {
    const {dates, pos} = this.state;
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <div className="col-sm-4 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>date</h1>
              <p>{dates.startDate.format('MMM Do YYYY')}</p>
              <p>{dates.endDate.format('MMM Do YYYY')}</p>
            </article>
          </div>
          <div className="col-sm-4 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>revenue</h1>
              <p id="total-revenue">{pos && util.sumProp('revenue', pos)}</p>
            </article>
          </div>
          <div className="col-sm-4 gutter-bottom">
            <article className="paper paper-widget-small container-fluid">
              <h1>transactions</h1>
              <p id="total-transactions">{pos && util.sumProp('transactions', pos)}</p>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget container-fluid">
              <Linechart store={posStore} type="revenue"/>
            </article>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <article className="paper paper-widget container-fluid">
              <Linechart store={posStore} type="transactions"/>
            </article>
          </div>
        </div>
      </div>
    );
  }
});
