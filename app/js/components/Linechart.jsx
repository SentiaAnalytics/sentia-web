'use strict';
import util from '../util';
const G = google.visualization;

const mergeOptions = R.merge({
  titlePosition: 'in',
  titleTextStyle: {
    color: '#aaa'
  },
  area: true,
  curveType: 'function',
  backgroundColor: 'transparent',
  animation: {
    duration: 1000,
    easing: 'in'
  },
  hAxis: {
    gridlines: {
      color: 'transparent'
    },
    baselineColor: 'transparent',
    textStyle: {
      fontSize: 10,
      color: '#aaa'
    }
  },
  vAxis : {
    baselineColor: 'transparent',
    gridlines: {
      count: 5,
      color: '#eee'
    },
    textStyle: {
      fontSize: 10,
      color: '#aaa'
    }
    // gridlines:{color:'transparent'}
  },
  tooltip: {isHtml: true},
  colors: ['#36a3ff'],
  legend: 'none',
  lineWidth: 2

});



var round2 = util.round(2);
var toDate = R.invoker(0, 'toDate');

var createDataTable = R.curry(function (type, data) {
  var processPair = R.compose(R.over(util.headLens, toDate), R.over(util.endLens, round2));
  var processData = R.compose(R.prepend(['Time', type]), R.map(processPair));
  return R.compose(G.arrayToDataTable, processData)(data);
});

export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let {observable, type, title, options} = this.props;

    const chart = new G.AreaChart(element);
    const draw = R.curry((options, data) => chart.draw(data, options))(mergeOptions(options));

    this.disposable = observable
      .map(createDataTable(type))
      .subscribe(draw, err => console.error('lineChart', err));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render () {
    return (
      <div className="chart"></div>
    );
  }
});
