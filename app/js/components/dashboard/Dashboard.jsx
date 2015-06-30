'use strict';
import dispatcher from '../../services/dispatcher';
import * as storesStore from '../../stores/storesStore';
import * as dateStore from '../../stores/dateStore';
import * as posStore from '../../stores/posStore';


export default React.createClass({
  getInitialState () {
      return {
        store: null,
        startDate: null,
        endDate: null,
        pos: null
      };
  },

  componentDidMount() {
    document.title = 'Sentia Analytics - Dashboard';
    storesStore.onChange(this.handleChange)
    dateStore.onChange(this.handleChange)
    posStore.onChange(this.handleChange)
    dispatcher.dispatch({
      actionType: 'FETCH_STORE',
      storeId: '123'
    });
  },

  handleChange () {
    const state = {
      store: storesStore.getSelectedStore(),
      startDate: dateStore.getStartDate(),
      endDate: dateStore.getEndDate(),
      pos: posStore.get()
    };

    this.setState(state);
  },

  render () {
    const {store, startDate, endDate, pos} = this.state;
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          <article className="paper col-sm-6">
            <h1>revenue</h1>
            <p>{pos && pos.totalRevenue}</p>
          </article>
        </div>
      </div>
    );
  }
});
