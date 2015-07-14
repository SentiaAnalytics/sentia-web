'use strict';
import sessionStore from '../stores/sessionStore';

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
    sessionStore.set({action: 'logout'});
  }

});
