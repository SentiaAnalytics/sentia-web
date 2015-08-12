'use strict';
const chartOptions = {
  title: 'CHURN RATE',
  titlePosition: 'in',
  titleTextStyle: {
    color: '#aaa'
  },
  chartArea: {width:'100%', height:'100%'},
  backgroundColor: 'transparent',
  animation: {
    duration: 1000,
    easing: 'in'
  },
  hAxis: {
    gridlines: { color: 'transparent' },
    textPosition: 'in',
    baselineColor: 'transparent',
    textStyle: {color: '#fff'}
  },
  vAxis : {
    baselineColor: 'transparent',
    gridlines:{color:'transparent'}
  },
  bar : {
    groupWidth: '95%'
  },
  tooltip: {isHtml: true},
  colors: ['#44b6ae'],
  legend: 'none'
};

const createDataTable = R.curry(_createDataTable);
export default React.createClass({

  componentDidMount () {

    let element = this.getDOMNode();
    let store = this.props.store;

    this.chart = new google.visualization.ColumnChart(element);

    this.observable = store.observable
      .filter(x => !R.isEmpty(x))
      .map(R.partial(createDataTable(this.props.type)))
      .subscribe((data)=> this.drawChart(data), err => console.error('barChart', err));
  },

  componentWillUnmount () {
    this.observable.dispose();
  },

  drawChart (data) {
    this.chart.draw(data, chartOptions);
  },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }

});

function _createDataTable (type, data) {
  return R.pipe(
    R.map(x => [x.cam, x[type]]),
    R.prepend(['Camera', type]),
    google.visualization.arrayToDataTable
  )(data);
}
