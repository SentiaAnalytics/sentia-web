'use strict';
import FeatureToggle from './FeatureToggle';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    let {storeId} = this.props;
    return (
      <div className="sidebar">
        <Link className="sidebar-link" activeClassName="active" to="dashboard" params={{storeId}}>
          <i className="glyphicon glyphicon-stats"></i> <span className="hidden-xs"> Dashboard</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="compare" params={{storeId}}>
          <i className="glyphicon glyphicon-road"></i> <span className="hidden-xs"> Compare</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="floors" params={{storeId}}>
          <i className="glyphicon glyphicon-record"></i> <span className="hidden-xs"> Floorplans</span>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="cameras" params={{storeId}}>
          <i className="glyphicon glyphicon-camera"></i> <span className="hidden-xs"> Cameras</span>
        </Link>
      </div>
    );
  }
});
