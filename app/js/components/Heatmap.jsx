'use strict';
import simpleheat from '../services/simpleheat';
const mergeOptions = R.merge({
  width:100,
  height:100,
  max: 3000,
  radius: [10, 15]
});

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
    this.heatmap = simpleheat(canvas);
    this.heatmap.radius.apply(this.heatmap, opt.radius);

    const update = (data) => {
      this.heatmap.max(opt.max);
      this.heatmap.data(data).draw();
    };

    this.dispose = observable
      .onValue(update);
  },

  componentWillUnmount() {
    this.heatmap.clear()
    this.dispose();
  },
  render () {
    const {cols, rows, options, style} = this.props;
    const opt = mergeOptions(options)
    return (
      <canvas style={R.merge(heatmapStyle, style)} width={opt.width} height={opt.height} className="block full-height absolute"></canvas>
    );
  }
})
