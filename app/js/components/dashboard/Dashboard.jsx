'use strict';
import dispatcher from '../../services/dispatcher';
import * as storesStore from '../../stores/storesStore';
import dateStore from '../../stores/dateStore';
import * as posStore from '../../stores/posStore';


export default React.createClass({
  getInitialState () {
      return {
        startDate: null,
        endDate: null
      };
  },

  componentDidMount() {
    document.title = 'Sentia Analytics - Dashboard';
    this.dateObserver = dateStore.dates
      .map(dates => {
        return R.merge(this.state, dates)
      })
      .subscribe(this.setState.bind(this))
  },

  componentWillUnmount () {
    this.dateObserver.dispose();
  },

  handleChange () {
    const state = {
      startDate: dateStore.getStartDate(),
      endDate: dateStore.getEndDate()
    };

    this.setState(state);
  },

  render () {
    const {store, startDate, endDate, pos} = this.state;
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <div className="col-sm-6">
            <article className="paper container-fluid">
              <h1>date</h1>
              <p>{startDate && startDate.toString()}</p>
              <p>{endDate && endDate.toString()}</p>
            </article>
          </div>
          <div className="col-sm-6">
            <article className="paper container-fluid">
              <h1>revenue</h1>
              <p>{pos && pos.totalRevenue}</p>
            </article>
          </div>
        </div>
      </div>
    );
  }
});
