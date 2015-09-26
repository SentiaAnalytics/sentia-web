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
  // legend: 'none',
  lineWidth: 2

});

const round2 = util.round(2);
const toDate = m => m.toDate();

export default React.createClass({
  getInitialState () {
    return {
      data: []
    };
  },

  componentDidMount () {
    let element = this.getDOMNode();
    let {observable, type, title, options} = this.props;

    this.chart = new G.AreaChart(element);
    this.disposable = observable
      .subscribe(data => this.setState({data}));
  },

  shouldComponentUpdate (props, state) {
    const {options, type} = props;
    if (R.isEmpty(state.data)) {
      this.chart.clearChart();
    } else {
      let data = G.arrayToDataTable(state.data);
      this.chart.draw(data, mergeOptions(props.options));
    }
    return false;
  },

  render () {
    return (
      <div className="chart"></div>
    );
  }
});
