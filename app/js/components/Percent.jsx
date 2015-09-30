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

    this.dispose = Bacon.combineAsArray(
        dividend.map(R.map(R.last)),
        divisor.map(R.map(R.last)))
      .filter(([dividend, divisor]) => dividend && divisor)
      .map(([dividend, divisor]) => (R.sum(dividend) / R.sum(divisor)) * multiplier)
      .map(util.round(2))
      .onValue(result => this.setState({result}));
  },

  componentWillUnmount () {
    this.dispose();
  },

  render () {
    const {result} = this.state;
    const {id, title, suffix, color} = this.props;
    return (
      <Numberwidget id={id} title={title} value={result} suffix={suffix || '%'} className={this.props.className} color={color}/>
    );
  }
});
