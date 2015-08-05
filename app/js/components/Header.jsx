'use strict';
import sessionContainer from '../containers/sessionContainer';

export default React.createClass({


  render: function() {
    return (
      <div className="paper navbar navbar-default">
        <div className="container-fluid">
          <a className="a pull-left font-size-huge glyphicon glyphicon-menu-hamburger navbar-btn" onClick={this.toggleMenu}></a>
          <a className="a pull-right font-size-huge glyphicon glyphicon-off navbar-btn" onClick={this.logout}></a>
        </div>
      </div>
    );
  },
  logout () {
    sessionContainer.observer.onNext({action: 'logout'});
  }

});
