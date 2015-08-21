'use strict';
import util from '../util';
let disposable;
const G = google.visualization;

const chartOptions = {
  title: 'REVENUE',
  titlePosition: 'in',
  titleTextStyle: {
    color: '#aaa'
  },
  curveType: 'function',
  chartArea: {width:'99%', height:'100%'},
  backgroundColor: 'transparent',
  animation: {
    duration: 1000,
    easing: 'in'
  },
  hAxis: {
    gridlines: {
      color: 'transparent'
    },
    textPosition: 'in',
    baselineColor: 'transparent',
    textStyle: {
      fontSize: 10,
      color: '#aaa'
    }
  },
  vAxis : {
    textPosition: 'in',
    baselineColor: 'transparent',
    gridlines: {
      count: 5,
      color: 'transparent'
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

};

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
    let {observable, type} = this.props;

    this.chart = new G.LineChart(element);
    this.observable = observable
      .filter(x => !R.isEmpty(x))
      .map(createDataTable(type))
      .subscribe((data)=> this.drawChart(data), err => console.error('lineChart', err));
  },

  componentWillUnmount () {
    this.observable.dispose();
  },
  drawChart (data) {
    this.chart.draw(data, R.assoc('title', R.toUpper(this.props.type), chartOptions));
  },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});
