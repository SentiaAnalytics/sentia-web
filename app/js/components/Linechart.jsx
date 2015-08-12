'use strict';
import util from '../util';
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

const createDataTable = R.curry(_createDataTable);

export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let store = this.props.store;

    this.chart = new google.visualization.LineChart(element);

    this.observable = store.observable
      .filter(x => !R.isEmpty(x))
      .map(R.partial(createDataTable(this.props.type)))
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

function _createDataTable (type, data) {
  var round = util.round(2);
  return R.pipe(
    R.map(x => [x.time.toDate(), round(x[type])]),
    R.prepend(['Time', type]),
    google.visualization.arrayToDataTable
  )(data);
}
