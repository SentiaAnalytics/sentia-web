'use strict';
import Chartist from 'chartist';
const defaultData = {
  labels:['0', '0'],
  series: [[0, 0]]
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
  width: '100%',
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
    this.chart = new Chartist.Line(element, defaultData, defaultOptions);

    this.observable = store.observable
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
  if (data.labels.length === 0) return {data: data, options: {}};
  let labelFunc = createLabelInterpolationFunction(data.labels);
  return {
    data: data,
    options: R.assocPath(['axisX', 'labelInterpolationFnc'], labelFunc, defaultOptions)
  }
}

function prepareLabels (labels) {

  let currentDate;
  let labelIndex = -1;

  return R.pipe(
    R.groupBy(x => x.format('YYYY-MM-DD')),
    R.values,
    filterByRatio,
    R.map(printMiddleDate),
    R.flatten
  )(labels);

  function filterByRatio (list) {
    let ratio = R.pipe(
      x => x/20,
      Math.ceil,
      R.partial(Math.max, 1)
    )(list.length);
    let i = -1;
    return R.map((x) => {
      if (++i % ratio === 0) {
        return x;
      }
      return x.map(() => '');
    }, list);
  }

  function printMiddleDate (list) {
    return R.concat([printDate(R.head(list))], R.map(x=> '', R.tail(list)));

    function printDate (date) {
      if (R.isNil(date) || R.isEmpty(date)) return '';
      if (currentDate && currentDate.isSame(date, 'month')) {
        return date.format('Do');
      } else {
        currentDate = date;
        return date.format('Do, <br> MMM');
      }
    }
  }
}
