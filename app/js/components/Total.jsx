'use strict';
import Numberwidget from './Numberwidget';
import util from '../util';
export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      result:0
    };
  },
  componentDidMount () {
    const {observable} = this.props;
    this.dispose = observable
      .filter(R.isArrayLike)
      .map(R.map(R.last))
      .map(R.sum)
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
      <Numberwidget id={id} title={title} value={result} suffix={suffix} className={this.props.className} color={color}/>
    );
  }
});
