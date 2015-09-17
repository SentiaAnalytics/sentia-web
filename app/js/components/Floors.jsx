'use strict';
import {Link} from 'react-router';
import cameralistContainer from '../containers/cameralistContainer';
import churnrateContainer from '../containers/churnrateContainer';
import Heatmap from './Heatmap';

var cameraStyle = (cam) => ({left: cam.pos.x + '%', top: cam.pos.y + '%' });

var _printCamera = R.curry(function (storeId, cam) {
  const cameraId = cam._id;
   return  (
     <Link key={cameraId} to="camera" params={{storeId, cameraId}}>
      <div className="font-size-large absolute glyphicon glyphicon-map-marker text-primary floorplan-pin" style={cameraStyle(cam)}></div>
     </Link>
   );
})

var _printFloor = R.curry(function (printCamera, floorCameraPair) {
  const heat = churnrateContainer
    .observable
    .map(R.filter(x => x.floor === R.head(floorCameraPair)))
    .map(R.map(cam => [cam.pos.x, cam.pos.y, cam.people]));

  return (
    <div key={R.head(floorCameraPair)} className="row gutter-bottom floorplan-container">
      <div className="relative floorplan">
        <Heatmap observable={heat} options={{max:100}}/>
        <img className="block" src={`/images/floors/${R.head(floorCameraPair)}.jpg`}/>
        {R.map(printCamera, R.last(floorCameraPair))}
      </div>
    </div>
  );
});

var _printFloorList = R.curry(function (printFloor, cameraList) {
  const floorCameraPairs = R.compose(R.toPairs, R.groupBy(R.prop('floor')));
  const printFloors = R.compose(R.map(printFloor), floorCameraPairs);
  return printFloors(cameraList);
});

export default React.createClass({
  observers: [],
  getInitialState () {
    return {
      cameraList: []
    };
  },

  componentDidMount () {
    document.title = 'Sentia Analytics - Floors';
    this.disposable = cameralistContainer.observable
      .subscribe(cameraList => this.setState({cameraList}));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render () {
    var printCamera = _printCamera(this.props.params.storeId);
    var printFloor = _printFloor(printCamera);
    var printFloorList = _printFloorList(printFloor);
    return (
      <div className="gutter-top gutter-bottom">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          {printFloorList(this.state.cameraList)}
        </div>
      </div>
    );
  }
});
