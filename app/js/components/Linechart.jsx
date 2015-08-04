'use strict';
const chartOptions = {
  title: 'REVENUE',
  titlePosition: 'in',
  titleTextStyle: {
    color: 'white'
  },
  curveType: 'function',
  chartArea: {width:'80%', height:'70%'},
  backgroundColor: 'transparent',
  animation: {
    duration: 1000,
    easing: 'in'
  },
  hAxis: {
    gridlines: {
      color: 'transparent'
    },
    // textPosition: 'in',
    baselineColor: 'transparent',
    textStyle: {
      fontSize: 10
    }
  },
  vAxis : {
    baselineColor: 'transparent',
    gridlines: {
      count: 4,
      color: '#f5f5f5'
    },
    textStyle: {
      fontSize: 10
    }
    // gridlines:{color:'transparent'}
  },
  tooltip: {isHtml: true},
  colors: ['#36a3ff'],
  legend: 'none',
  lineWidth: 3

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
  console.log('DATA', data);
  return R.pipe(
    R.map(x => [x.time.toDate(), x[type]]),
    R.prepend(['Time', type]),
    R.tap(x => console.log('TAP', x)),
    google.visualization.arrayToDataTable
  )(data);
}
