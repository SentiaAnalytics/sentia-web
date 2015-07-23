'use strict';
import sessionContainer from '../containers/sessionContainer';

export default React.createClass({


  render: function() {
    return (
      <div className="paper navbar navbar-default">
        <div className="container-fluid">
          <button className="pull-right btn navbar-btn btn-danger" onClick={this.logout}>logout</button>
        </div>
      </div>
    );
  },
  logout () {
    sessionContainer.observer.onNext({action: 'logout'});
  }

});
