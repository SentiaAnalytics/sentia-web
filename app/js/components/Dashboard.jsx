'use strict';
import posContainer from '../containers/posContainer';
import peopleContainer from '../containers/peopleContainer';
import churnrateContainer from '../containers/churnrateContainer';
import util from '../util';
import Linechart from './Linechart';
import Total from './Total';
import Percent from './Percent';

const isNotEmpty = R.compose(R.not, R.isEmpty);

export default React.createClass({
  componentDidMount () {
    document.title = 'Sentia Analytics - Dashboard';
  },

  render () {
    const revenue = posContainer.observable
      .map(R.map(R.props(['time', 'revenue'])))
      .filter(isNotEmpty);

    const transactions = posContainer.observable
      .map(R.map(R.props(['time', 'transactions'])))
      .filter(isNotEmpty);

    const people = peopleContainer.observable
      .map(R.map(R.props(['time', 'people'])))
      .filter(isNotEmpty);


    return (
      <div className="gutter-top gutter-bottom">
        <div className="container-fluid">

          <div className="col-sm-6 gutter-bottom">
            <div className="row">
              <div className="col-sm-6 col-xs-6 gutter-bottom">
                <Total observable={people} prop="people" id="total-people" title="people" className="paper"/>
              </div>
              <div className="col-sm-6 col-xs-6 gutter-bottom">
                <Total observable={revenue} prop="revenue" id="total-revenue" title="revenue" className="paper"/>
              </div>
            </div>
          </div>
          <div className="col-sm-6 gutter-bottom">
            <div className="row">
              <div className="col-sm-6 col-xs-6 gutter-bottom">
                <Percent dividend={revenue} divisor={transactions} id="basket-size" title="Basket Size" suffix="DKK" className="paper"/>
              </div>
              <div className="col-sm-6 col-xs-6 gutter-bottom">
                <Percent dividend={transactions} divisor={people} id="conversion" title="Conversion Rate" suffix="%" className="paper"/>
              </div>
            </div>
          </div>


          <div className="col-xs-12 gutter-bottom">
            <h2>People</h2>
            <article className="paper-widget paper">
              <Linechart observable={people} type="people" title="People"/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Revenue</h2>
            <article className="paper-widget paper">
              <Linechart observable={revenue} type="revenue" title="Revenue"/>
            </article>
          </div>

          <div className="col-xs-12 gutter-bottom">
            <h2>Transactions</h2>
            <article className="paper-widget paper">
              <Linechart observable={transactions} type="transactions" title="Transactions"/>
            </article>
          </div>

        </div>
      </div>
    );
  }
});
