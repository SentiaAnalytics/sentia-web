'use strict';
import React from 'react';
import * as utils from '../../services/utils';
import dispatcher from '../../services/dispatcher';

export default React.createClass({

  render: function () {
    return (
      <div className="valign-center">
        <form className="col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" onSubmit={this.login}>
          <div className="uppercase">Welcome</div>
          <div className="form-group">
            <input className="form-control" type="email" name="email"/>
          </div>
          <div className="form-group">
            <input className="form-control" type="password" name="password"/>
          </div>
          <input className="btn btn-primary btn-block" type="submit" value="Go!"/>
        </form>
      </div>
    );
  },

  login: function (event){
    event.preventDefault();
    let credentials = utils.getFormModel(event.target);
    dispatcher.dispatch({
      actionType: 'LOGIN',
      credentials: credentials
    });
  }

});
