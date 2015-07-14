'use strict';
import Chartist from 'chartist';
const defaultData = {
  labels:[0],
  series: [[0]]
};

const defaultOptions = {
  axisY: {
    showGrid: false
  },
  axisX: {
    showGrid: false
  },
  lineSmooth: Chartist.Interpolation.simple({
    divisor: 2
  }),
  showArea: true,
  showLine: false,
  showPoint: true,
  fullWidth: true,
  fullHeight: true,
  chartPadding: {
    top: 20,
    right: 0,
    bottom: 0,
    left: 0,
  },
};
export default React.createClass({

  componentDidMount () {
    let element = this.getDOMNode();
    let store = this.props.store;
    let type = this.props.type;
    let data = prepareDataForChart(type, store.getValue());
    this.chart = new Chartist.Line(element, defaultData, defaultOptions);

    this.observable = store
      .filter(x => !R.isEmpty(x))
      .map(R.partial(prepareDataForChart, this.props.type))
      .subscribe((data)=> this.chart.update(data), err => console.error('lineChart', err));
  },

  componentWillUnmount () {
    this.observable.dispose();
  },

  render: function() {
    return (
      <div className="chart"></div>
    );
  }
});

function prepareDataForChart (prop, data) {
   return {
     labels: prepareLabels(R.map((x) => x.time, data)),
     series : [R.map(R.prop(prop), data)]
   }
}

function addChartOptions (data) {
  console.log(data);
  if (data.labels.length === 0) return {data: data, options: {}};
  let labelFunc = createLabelInterpolationFunction(data.labels);
  return {
    data: data,
    options: R.assocPath(['axisX', 'labelInterpolationFnc'], labelFunc, defaultOptions)
  }
}
function prepareLabels (labels) {
  let ratio = Math.max(Math.ceil(labels.length/ 10), 1);
  let currentDate;
  return labels.map((x,i) => {
    if (currentDate && x.isSame(currentDate, 'day')) return '';
    if (i % ratio !== 0) return '';
    currentDate = x;
    return x.format('Do');
  })
}
