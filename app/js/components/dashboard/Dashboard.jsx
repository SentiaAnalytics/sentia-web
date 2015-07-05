'use strict';
import dispatcher from '../../services/dispatcher';
import dateStore from '../../stores/dateStore';
import posStore from '../../stores/posStore';


export default React.createClass({
  observers: [],
  getInitialState () {
    return {pos:posStore.store.getValue(), dates: dateStore.store.getValue()}
  },

  componentDidMount() {
    console.log('componentDidMount');
    document.title = 'Sentia Analytics - Dashboard';
    this.observer = rx.Observable.combineLatest(
        dateStore.store,
        posStore.store,
        (dates, pos) => {
          return{dates, pos}
        })
      .subscribe(this.setState.bind(this));

  },

  componentWillUnmount () {
    this.observer.dispose();
  },

  render () {
    const {dates, pos} = this.state;
    console.log(this.state);
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <div className="col-sm-4">
            <article className="paper container-fluid">
              <h1>date</h1>
              <p>{dates.startDate.toString()}</p>
              <p>{dates.endDate.toString()}</p>
            </article>
          </div>
          <div className="col-sm-4">
            <article className="paper container-fluid">
              <h1>revenue</h1>
              <p>{pos && pos.totalRevenue}</p>
            </article>
          </div>
          <div className="col-sm-4">
            <article className="paper container-fluid">
              <h1>transactions</h1>
              <p>{pos && pos.totalTransactions}</p>
            </article>
          </div>
        </div>
      </div>
    );
  }
});
