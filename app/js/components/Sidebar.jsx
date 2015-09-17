'use strict';
import sessionContainer from '../containers/sessionContainer';
import {Link} from 'react-router';

export default React.createClass({
  logout () {
    sessionContainer.observer.onNext({action: 'logout'});
  },
  render: function() {
    let {storeId} = this.props;
    return (
      <div className="sidebar">
        <Link className="sidebar-link" activeClassName="active" to="dashboard" params={{storeId}}>
          <img src="/images/logos/logo_192.png"/>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="dashboard" params={{storeId}}>
          <i className="glyphicon glyphicon-signal"></i>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="floors" params={{storeId}}>
          <i className="glyphicon glyphicon-record"></i>
        </Link>
        <a className=" hidden-xs sidebar-link bottom glyphicon glyphicon-off" onClick={this.logout}></a>
      </div>
    );
  }
});
