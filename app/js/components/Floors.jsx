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
      <div className="gutter-top full-height scroll-y gutter-bottom">
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
    let printCam = R.curry(printCamera)(R.head(floorCameraPair));
    return (
      <div className="col-xs-8 col-xs-offset-2 gutter-bottom">
        <div className="paper relative">
          <img className="block" src={`/api/stores/floorplans/${R.head(floorCameraPair)}.jpg`}/>
          {R.map(printCam, R.last(floorCameraPair))}
        </div>
      </div>
    );
  }

}

function printCamera (storeId, cam) {
  let cameraId = cam._id;
  console.log('STOREID', storeId);
  console.log('cam', cam);
   return  (
     <Link to="camera" params={{storeId, cameraId}}>
      <div className="font-size-large absolute glyphicon glyphicon-map-marker text-primary" style={cameraStyle(cam)}></div>
     </Link>
   );
}

function cameraStyle (cam) {
  return {
    left: cam.pos.x + '%',
    top: cam.pos.y + '%'
  };
}
