'use strict';
import Chartist from 'chartist';
import posStore from '../stores/posStore';
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
    let data = prepareDataForChart(this.props.type, posStore.store.getValue());
    this.chart = new Chartist.Line(element, defaultData, defaultOptions);

    this.observable = posStore.store
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
