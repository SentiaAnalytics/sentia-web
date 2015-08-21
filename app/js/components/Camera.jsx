'use strict';
import util from '../util';
import {Link} from 'react-router';
import cameraPeopleContainer from '../containers/cameraPeopleContainer';
import cameraContainer from '../containers/cameraContainer';
import Total from './Total';
import Linechart from './Linechart';

let disposable;
export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      camera: cameraContainer.observable.getValue()
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Camera';
    disposable = cameraContainer.observable
      .subscribe(camera => this.setState({camera}));

    cameraContainer.observer.onNext(this.props.params.cameraId);
  },

  componentWillUnmount () {
    disposable.dispose();
  },

  render () {
    const people = cameraPeopleContainer
      .observable
      .map(R.map(R.props(['time', 'people'])));

    return (
      <div>
        <h1>{R.path(['state', 'camera', 'name'], this)}</h1>
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
});
