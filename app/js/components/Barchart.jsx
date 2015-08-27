'use strict';
const G = google.visualization;

const chartOptions = (title) => {

  return {
    title: title,
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
};

const createDataTable = R.curry((header, data) => {
  return R.compose(G.arrayToDataTable, R.prepend(header))(data);
});

export default React.createClass({
  componentDidMount () {
    const element = this.getDOMNode();
    const {observable, header, title} = this.props;
    const chart = new G.ColumnChart(element);
    const draw = R.curry((options, data) => chart.draw(data, options))(chartOptions(title));

    this.disposable = observable
      .map(createDataTable(header))
      .subscribe(draw, err => console.error('barChart', err));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render: function() {

    return (
      <div className="chart"></div>
    );
  }

});
