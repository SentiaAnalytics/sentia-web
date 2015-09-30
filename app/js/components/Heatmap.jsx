'use strict';
import simpleheat from '../services/simpleheat';
const mergeOptions = R.merge({
  width:100,
  height:100,
  max: 3000,
  radius: [10, 20]
});
const max = R.compose(R.head, R.sort((a, b) => b-a));

const heatmapStyle = {
  top:0,
  left:0,
  opacity: 0.6
};
export default React.createClass({
  componentDidMount () {
    const {observable, options} = this.props;
    const opt = mergeOptions(options);
    const canvas = this.getDOMNode();
    const heatmap = simpleheat(canvas);
    heatmap.radius.apply(heatmap, opt.radius);

    const update = (data) => {
      console.log('updateing heatmap', data);
      heatmap.max(opt.max);
      heatmap.data(data).draw();
    };

    this.dispose = observable
      .onValue(update);
  },

  componentWillUnmount() {
    this.dispose();
  },
  render () {
    const {cols, rows, options} = this.props;
    const opt = mergeOptions(options)
    return (
      <canvas style={heatmapStyle} width={opt.width} height={opt.height} className="block full-height absolute"></canvas>
    );
  }
})
