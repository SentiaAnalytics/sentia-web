'use strict';
import util from '../util';
import {Link} from 'react-router';
import cameraPeopleContainer from '../containers/cameraPeopleContainer';
import cameraContainer from '../containers/cameraContainer';
import Total from './Total';
import Linechart from './Linechart';

const snapshotUrl = (camera) => `/api/cameras/${camera._id}/snapshot.jpg`;
const style = (camera) => {
  return {'transform': `rotate(${camera.rotate| 0}deg)`};
};
const peopleCounter = (camera, people) => {
  if (!camera.counter) {
    return;
  }
  return (
    <div>
      <div className="col-sm-12 gutter-bottom">
        <Total observable={people} id="camera-people-in" title="People"/>
      </div>
      <div className="col-sm-12 gutter-bottom">
        <article className="paper-widget">
          <Linechart observable={people} type="people"/>
        </article>
      </div>
    </div>
  );
}
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
    const people = cameraPeopleContainer
      .observable
      .map(R.map(R.props(['time', 'people'])));

    return (
      <div>
        <h1>{camera.name}</h1>
        {peopleCounter(camera, people)}

        <div className="col-sm-8 col-sm-offset-2 gutter-bottom">
          <article className="paper">
            <img src={camera ? snapshotUrl(camera): ''} className="block" style={style(camera)}/>
          </article>
        </div>
      </div>
    );
  }
});
