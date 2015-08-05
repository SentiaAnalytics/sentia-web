'use strict';
import {Link} from 'react-router';
import cameraListContainer from '../containers/cameraListContainer';
export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      cameraList: cameraListContainer.observable.getValue()
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Floors';
    this.observer = cameraListContainer.observable
      .subscribe(cameraList => this.setState({cameraList}));

  },

  componentWillUnmount () {
    this.observer.dispose();
  },

  render () {
    return (
      <div className="full-height gutter-top gutter-bottom bg-gray-lighter">
        <div className="container-fluid">
          {printFloors(this.state.cameraList)}
        </div>
      </div>
    );
  }
});

function printFloors (cameraList) {
  console.log('CAMS', cameraList);
  return R.pipe(
    R.groupBy(R.prop('floor')),
    R.toPairs,
    R.reverse, // Tiger specific
    R.map(printFloor)
  )(cameraList);


  function printFloor (floorCameraPair) {
    return (
      <div className="col-xs-8 col-xs-offset-2 gutter-bottom">
        <div className="paper relative">
          <img className="block" src={`/api/stores/floorplans/${R.head(floorCameraPair)}.jpg`}/>
          {R.map(printCamera, R.last(floorCameraPair))}
        </div>
      </div>
    );
  }

}

function printCamera (cam) {
  console.log('CAM');
   return  (
        <div className="font-size-large absolute glyphicon glyphicon-map-marker text-primary" style={cameraStyle(cam)}> </div>
   );
}

function cameraStyle (cam) {
  return {
    left: cam.pos.x + '%',
    top: cam.pos.y + '%'
  };
}
