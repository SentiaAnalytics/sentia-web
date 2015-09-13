'use strict';
import Numberwidget from './Numberwidget';
import util from '../util';
let disposable;
export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      result:0
    };
  },
  componentDidMount () {
    const {dividend, divisor, suffix} = this.props;
    const multiplier = suffix === '%' ? 100: 1;

    this.disposable = Rx.Observable.combineLatest(
        dividend.map(R.map(R.last)),
        divisor.map(R.map(R.last)),
        (dividend, divisor) => ({dividend, divisor}))
      .tap(logger.log('Percent'))
      .filter(x => x.dividend && x.divisor)
      .map(({dividend, divisor}) => (R.sum(dividend) / R.sum(divisor)) * multiplier)
      .map(util.round(2))
      .tap(logger.log('percent'))
      .subscribe(result => this.setState({result}));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render () {
    const {result} = this.state;
    const {id, title, suffix} = this.props;
    return (
      <Numberwidget id={id} title={title} value={result} suffix={suffix || '%'} className={this.props.className}/>
    );
  }
});
