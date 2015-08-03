'use strict';
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
          <ul>
          {printCameras(this.state.cameraList)}
          </ul>
        </div>
      </div>
    );
  }
});

function printCameras (cameraList) {
   console.log(cameraList);
   return R.map(cam => {
     return <li className="camera"><img src={`/api/cameras/${cam._id}/snapshot.jpg`}/></li>
   }, cameraList);
}
