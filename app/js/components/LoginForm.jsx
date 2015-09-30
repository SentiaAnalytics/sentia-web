'use strict';
import util from '../util';
import sessionContainer from '../containers/sessionContainer';

const showError = function (error) {
  if (error) {
    return <p id="loginerror" className="alert alert-danger"> {error}</p>
  }
}

export default React.createClass({
  render: function () {
    const error = this.props.error;
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
          {showError(error)}
        </form>
      </div>
    );
  },

  login: function (event){
    event.preventDefault();
    sessionContainer.observer.push({
        action: 'login',
        payload: util.getFormData(event.target)
      });
  }

});
