'use strict';
import cameralistContainer from '../containers/cameralistContainer';
import {Link} from 'react-router';

const snapshotUrl = (camera) => `/images/cameras/${camera._id}.jpg`;
const sortCameras = R.sort((a, b) => a.name > b.name? 1: -1);

const renderCamera = R.curry((storeId, camera) => {
  const cameraId = camera._id;
  return (
    <div className ="col-xs-12 col-sm-6 col-md-4 gutter-bottom">
      <Link key={cameraId} to="camera" params={{storeId, cameraId}}>
        <article className="paper">
          <div className="paper-header" style={{backgroundImage: `url(${snapshotUrl(camera)})`}}></div>
          <div className="paper-body">
            <span className="font-size-huge thin">{camera.name}</span>
          </div>
        </article>
      </Link>
    </div>
    );
});

const searchFilter = R.curry((searchText, camera) => {
  return R.toLower(camera.name).indexOf(R.toLower(searchText)) !== -1;
});

export default React.createClass({
  getInitialState () {
    return {
      cameras: [],
      searchText: ''
    };
  },

  componentDidMount () {
    this.disposable = cameralistContainer
      .observable
      .subscribe(cameras =>  this.setState(R.assoc('cameras', cameras, this.state)));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },
  search (e) {
      this.setState(R.assoc('searchText', e.target.value, this.state));
  },

  render () {
    const {cameras, searchText} = this.state
    const {storeId} = this.props.params
    return (
      <div className="container-fluid gutter-top gutter-bottom">
        <div className="container-fluid gutter-bottom">
          <input className='form-control' value={searchText} onChange={this.search}/>
        </div>
        <div className="gutter-top gutter-bottom container-fluid">
          <div className="row">
            {R.compose(R.map(renderCamera(storeId)), sortCameras, R.filter(searchFilter(searchText)))(cameras)}
          </div>
        </div>
      </div>
    )
  }
})
