'use strict';
var db = require('./postgres'),
  E = require('express-http-errors'),
  _ = require('lodash'),
  when = require('when'),
  bcrypt = require('./bcrypt'),
  squel = require('squel');


// ## login
// user login function
exports.login = function (credentials) {
  return when(credentials)
    .then(this._getUser)
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
exports._getUser = function (credentials) {
  var query = squel.select()
    .from('"user"')
    .where('email = ?', credentials.email)
    .toString();

    return db.query(query)
      .then(function (response) {
        if (response.length === 0) {
          throw new E.NotFoundError('User not Found');
        }
        return response[0];
      });
};
exports._removePrivateFields = function (user) {
  delete user.password;
  return user;
};
