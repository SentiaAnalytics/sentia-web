'use strict';
import util from '../util';
import sessionContainer from '../containers/sessionContainer';

export default React.createClass({
  render: function () {
    return (
      <div className="valign-center">
        <form id="loginform" className="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" onSubmit={this.login}>
          <div className="uppercase">Welcome</div>
          <div className="form-group">
            <input className="form-control" type="email" name="email"/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password"/>
          </div>
          <div className="form-group">
            <input className="btn btn-primary btn-block" type="submit" value="Go!"/>
          </div>
          {this.showAlert()}
        </form>
      </div>
    );
  },

  showAlert() {
    if (this.props.error) {
      return <p id="loginerror" className="alert alert-danger"> {this.props.error}</p>
    }
  },

  login: function (event){
    console.log('LOGIN');
    event.preventDefault();
    sessionContainer.observer.onNext({
        action: 'login',
        payload: util.getFormData(event.target)
      });
  }

});
