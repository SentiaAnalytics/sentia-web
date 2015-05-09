import React from 'react';
export default class LoginForm extends React.Component {
  render () {
    return (
      <form className="col-sm-6 col-sm-offset-3 valign-center">
        <div className="form-group">
          <input className="form-control" type="email" name="email"/>
        </div>
        <div className="form-group">
          <input className="form-control" type="password" name="password"/>
        </div>
        <input className="btn btn-primary btn-block" type="submit" value="GO!"/>
      </form>
    );
  }
}
