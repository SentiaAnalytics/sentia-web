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
  showArea: true
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
      .subscribe((x)=> this.chart.update(x), err => console.error('lineChart', err));
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
     labels: R.map((x) => x.time.format('DD/MM/YYYY'), data),
     series : [R.map(R.prop(prop), data)]
   }
}
