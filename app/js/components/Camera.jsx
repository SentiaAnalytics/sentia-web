'use strict';
import util from '../util';
import {Link} from 'react-router';
import cameraPeopleContainer from '../containers/cameraPeopleContainer';
import cameraContainer from '../containers/cameraContainer';
import heatContainer from '../containers/heatContainer';
import Total from './Total';
import Linechart from './Linechart';
import Heatmap from './Heatmap';

const HEATMAP_SCALE = 10;
const snapshotUrl = (camera) => `/images/cameras/${camera._id}.jpg`;
const style = (camera) => {
  return {'transform': `rotate(${camera.rotate| 0}deg)`};
};
const peopleCounter = (camera, people) => {
  if (!camera.counter) {
    return;
  }
  return (
    <div>
      <div className="col-sm-3 gutter-bottom">
        <Total observable={people} id="camera-people-in" title="People" className="paper"/>
      </div>
      <div className="col-sm-9 gutter-bottom">
        <div className="paper paper-widget relative">
          <Linechart observable={people} type="people"/>
        </div>
      </div>
    </div>
  );
}
const people = cameraPeopleContainer
  .observable
  .map(R.map(R.props(['time', 'people'])));

const heat = heatContainer
  .observable
  .map(R.map(R.props(['x', 'y', 'heat'])));

export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      camera: {}
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Camera';
    this.disposable = cameraContainer.observable
      .subscribe(camera => this.setState({camera}));

    cameraContainer.observer.onNext(this.props.params.cameraId);
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render () {
    const camera = this.state.camera || {};
    const heatmapOptions = {
      width:camera.cols/HEATMAP_SCALE,
      height:camera.rows/HEATMAP_SCALE,
      radius: [1, 2]
    }
    return (
      <div className="container-fluid">
        <h1 className="text-center">{camera.name}</h1>
        {peopleCounter(camera, people)}
        <div className="col-sm-9 col-sm-offset-3 gutter-bottom">
          <article className="paper relative">
            <img src={camera ? snapshotUrl(camera): ''} className="block" style={style(camera)}/>
            <Heatmap observable={heat} options={heatmapOptions}/>
          </article>
        </div>
      </div>
    );
  }
});
