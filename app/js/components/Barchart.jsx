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
    this.chart = new Chartist.Bar(element, defaultData, defaultOptions);

    this.observable = store.observable
      .filter(x => !R.isEmpty(x))
      .map(R.partial(prepareDataForChart, this.props.type))
      .subscribe((data)=> this.chart.update(data), err => console.error('barChart', err));
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
  console.log('BAR CHART DATA', data);
   return {
     labels: R.map((x) => x.cam, data),
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

}
