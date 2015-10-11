'use strict';
import sessionContainer from '../containers/sessionContainer';
const logout = () => sessionContainer.observer.push({action: 'logout'});

export default React.createClass({
  render: function() {
    return (
      <div className="header bg-white">
        <div className="container-fluid">
          <div className="pull-left">
            <img src="/images/logos/logo_192.png" className="pull-left"/>
            <h1 className="pull-left"> Sentia<span className="thin">Analytics</span></h1>
          </div>
          <div className="pull-right">
            <a className="header-link a" onClick={logout}>
              <i className="glyphicon glyphicon-off"></i>
              <span className="hidden-xs">Logout</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

});
