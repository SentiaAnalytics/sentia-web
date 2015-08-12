'use strict';
import {Link} from 'react-router';
import cameraContainer from '../containers/cameraContainer';
export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      camera: cameraContainer.observable.getValue()
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Camera';
    this.observer = cameraContainer.observable
      .subscribe(camera => this.setState({camera}));
    cameraContainer.observer.onNext(this.props.params.cameraId);

  },

  componentWillUnmount () {
    this.observer.dispose();
  },

  render () {
    return (
      <h1>{R.path(['state', 'camera', 'name'], this)}</h1>
    );
  }
});
