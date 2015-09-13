'use strict';
import simpleheat from '../services/simpleheat';
const CANVAS_WIDTH = 854;
const CANVAS_HEIGHT = 552;
let dummyData = [
  [100,100, 8],
  [29,39, 2],
  [60,69, 5],
  [200,20, 9],
];

const scale = R.curry((width, height, point) => {
  return [
    (point[0]/100) * CANVAS_WIDTH,
    (point[1]/100) * CANVAS_HEIGHT,
    point[2]
  ];
});

const max = R.compose(R.head, R.sort((a, b) => b-a));
export default React.createClass({
  componentDidMount () {
    console.log('componentDidMount');
    const {observable} = this.props;
    const canvas = this.getDOMNode();
    const heatmap = simpleheat(canvas).data([]).draw();
    heatmap.radius(60, 100);

    const update = (data) => {
      console.log('updateing heatmap', data);
      console.log('max', max(R.map(R.last, data)));
      heatmap.max(max(R.map(R.last, data)));
      heatmap.data(data).draw();
    };

    this.disposable = observable
      .map(R.map(scale(855, 500)))
      .subscribe(update);
  },

  componentWillUnmount() {
    this.diposable.dispose();
  },
  render () {
    return (
      <canvas style={{opacity: 0.6}} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} className="block full-height absolute"></canvas>
    );
  }
})
