'use strict';
var models = require('../models'),
  UsersService = require('./UsersService'),
  E = require('express-http-errors'),
  _ = require('lodash'),
  when = require('when'),
  bcrypt = require('./bcrypt'),
  squel = require('squel');


// ## login
// user login function
exports.authenticate = function (credentials) {
  return when(credentials)
    .then(this._getUserQuery)
    .then(models.User.find)
    .then(_.partial(this._validatePassword, credentials.password))
    .then(this._removePrivateFields);

};


exports._validatePassword = function (password, user) {
  return bcrypt.compare(password, user.password)
    .then(function (response) {
      // remove the users password
      return user;
    })
    .catch(function (err) {
      throw new E.NotAuthorizedError(err);
    });
};

// ### get the user from the database
exports._getUserQuery = function (credentials) {
  return {
    where : {
      email : credentials.email
    }
  };
};
exports._removePrivateFields = function (user) {
  delete user.password;
  return user;
};
