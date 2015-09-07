'use strict';
import posContainer from '../containers/posContainer';
import peopleContainer from '../containers/peopleContainer';
import churnRateContainer from '../containers/churnRateContainer';
import util from '../util';
import Linechart from './Linechart';
import Barchart from './Barchart';
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

    const churnRate = churnRateContainer.observable
      .map(R.map(R.props(['cam', 'people'])))
      .filter(isNotEmpty);

    return (
      <div className="gutter-top gutter-bottom">
        <div className="container-fluid">
          <div className="col-sm-12 gutter-bottom">
            <Total observable={revenue} prop="revenue" id="total-revenue" title="revenue" suffix="DKK"/>
          </div>
          <div className="col-sm-12 gutter-bottom">
            <article className="paper-widget">
              <Linechart observable={revenue} type="revenue" title="Revenue"/>
            </article>
          </div>
          <div className="col-sm-12 gutter-bottom">
            <article className="paper-widget">
               <Barchart observable={churnRate} header={['Camera', 'People']} title="Churn Rate"/>
            </article>
          </div>
          <div className="col-md-6">
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Total observable={people} prop="people" id="total-people" title="people"/>
            </div>
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Percent dividend={transactions} divisor={people} id="conversion" title="Conversion Rate" suffix="%"/>
            </div>
            <div className="col-xs-12 gutter-bottom">
              <article className="paper-widget">
                <Linechart observable={transactions} type="transactions" title="Transactions"/>
              </article>
            </div>
          </div>
          <div className="col-md-6">
            <div className="col-md-6 col-xs-6 gutter-bottom">
              <Total observable={transactions} id="total-transactions" title="transactions"/>
            </div>
            <div className="col-sm-6 col-xs-6 gutter-bottom">
              <Percent dividend={revenue} divisor={transactions} id="basket-size" title="Basket Size" suffix="DKK"/>
            </div>

            <div className="col-xs-12 gutter-bottom">
              <article className="paper-widget">
                <Linechart observable={revenue} type="people"  title="People"/>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
