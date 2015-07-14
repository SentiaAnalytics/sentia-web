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
    showGrid: false,
    labelInterpolationFnc: (date) => date && date.format('YYY-MM-DD')
  },
  lineSmooth: Chartist.Interpolation.simple({
    divisor: 2
  }),
  showArea: true,
  showLine: true,
  showPoint: true
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
      .map(addChartOptions)
      .subscribe((x)=> this.chart.update(x.data, x.options), err => console.error('lineChart', err));
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
     labels: R.map((x) => x.time, data),
     series : [R.map(R.prop(prop), data)]
   }
}

function addChartOptions (data) {
  console.log(data);
  if (data.labels.length === 0) return {data: data, options: {}};
  let start = R.head(data.labels);
  let end = R.last(data.labels);
  let labelFunc = createLabelInterpolationFunction(start, end);
  return {
    data: data,
    options: R.assocPath(['axisX', 'labelInterpolationFnc'], labelFunc, defaultOptions)
  }
}
function createLabelInterpolationFunction (start, end) {
  let diff = moment.duration(end.diff(start));
  console.log(diff);
  let lastDate;

  if (diff.asDays() <= 1) {
    console.log('HOURLABELS');
    return hourlabels
  } else if (diff.asDays() <= 32) {
    console.log('DAYLABELS');
    return daylabels
  } else {
    console.log('MONTHLABELS');
    return monthlabels
  }
  function hourlabels (date) {
     return date.format('HH:00');
  }
  function daylabels (date) {
    let label =  date.format('Do');
    if (!date.isSame(lastDate, 'month')) {
      label += '<br>' + date.format('MMM');
    }
    lastDate = date;
    return label;
  }
  function monthlabels (date) {
    return date.format('MMM');
  }
}
