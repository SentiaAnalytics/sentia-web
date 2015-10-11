'use strict';
import location from '../services/location';
import {bindDateToUrlProperty} from '../util';
import {Link} from 'react-router';
import {startDateContainer} from '../containers/dateContainer';
import cameraPeopleContainer from '../containers/cameraPeopleContainer';
import cameraContainer from '../containers/cameraContainer';
import heatContainer from '../containers/heatContainer';
import Total from './Total';
import Datepicker from './Datepicker';
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
        <Total observable={people} id="total-people" title="People" className="paper"/>
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
    const update = (camera) => {
      document.title = 'Sentia Analytics - ' + camera.name;
      this.setState({camera});
    };

    this.disposeCamera = cameraContainer.observable
      .onValue(update);

    this.disposeStartDate = bindDateToUrlProperty('date', startDateContainer);

    cameraContainer.observer.push(this.props.params.cameraId);
  },

  componentWillUnmount () {
    this.disposeCamera();
    this.disposeStartDate();
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
        <div className="row clearfix gutter-top">
          <div className="btn-group col-xs-8 col-sm-4 col-xs-offset-2 col-sm-offset-4 gutter-bottom">
            <Datepicker container={startDateContainer} className="btn btn-primary col-xs-12"/>
          </div>
        </div>
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
