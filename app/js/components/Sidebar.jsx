'use strict';
import {Link} from 'react-router';

export default React.createClass({
  render: function() {
    let {storeId} = this.props;
    return (
      <div className="col-sm-1 sidebar">
        <Link className="sidebar-link" activeClassName="active" to="dashboard" params={{storeId}}>
          <img src="/images/logos/logo_192.png"/>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="dashboard" params={{storeId}}>
          <i className="glyphicon glyphicon-signal"></i>
        </Link>
        <Link className="sidebar-link" activeClassName="active" to="floors" params={{storeId}}>
          <i className="glyphicon glyphicon-record"></i>
        </Link>
      </div>
    );
  }
});
