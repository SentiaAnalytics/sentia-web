'use strict';
import sessionContainer from '../containers/sessionContainer';
import FeatureToggle from './FeatureToggle';
import Gravatar from 'react-gravatar';
import {Link} from 'react-router';

export default React.createClass({
  getInitialState () {
    return {user:{}};
  },

  componentDidMount() {
    this.disposable = sessionContainer
      .observable
      .filter(x => x)
      .subscribe(({user}) => this.setState({user}));
  },

  componentWillUnmount () {
    this.disposable.dispose();
  },

  render: function() {
    let {storeId} = this.props;
    let {user} = this.state;
    return (
      <div className="sidebar">
        <div className="media sidebar-header hidden-xs">
          <div className="media-left">
            <Gravatar email={user.email} size="50" className="media-object sidebar-header-img"/>
          </div>
          <div className="media-body">
            <div className="">{user.firstname} {user.lastname}</div>
            <div className="">{user.email}</div>
          </div>
        </div>
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
