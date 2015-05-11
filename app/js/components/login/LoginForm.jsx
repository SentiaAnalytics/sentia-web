'use strict';
import React from 'react';
import * as utils from '../../services/utils';
import dispatcher from '../../services/dispatcher';

export default class LoginForm extends React.Component {
  render () {
    return (
      <form className="col-sm-6 col-sm-offset-3 valign-center" onSubmit={this.login}>
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
  
  login(event){
    event.preventDefault();
    let credentials = utils.getFormModel(event.target);
    dispatcher.dispatch({
      actionType: 'LOGIN',
      credentials: credentials
    });
  }
  
}