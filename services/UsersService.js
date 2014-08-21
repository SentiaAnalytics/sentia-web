'use strict';
var db = require('./postgres'),
  _ = require('lodash'),
  when = require('when'),
  bcrypt = require('./bcrypt'),
  squel = require('squel');


// ## login
// user login function
function UsersService () {
  this.login = function (credentials) {
    return when(credentials)
      .then(this.getUser)
      .then(_.partial(this.validatePassword, credentials.password))
      .then(this.transformResponse);
  };

}


UsersService.prototype.validatePassword = function (password, user) {
  return bcrypt.compare(password, user.password)
    .then(function (response) {
      // remove the users password
      return user;
    })
    .catch(function (err) {
      return when.reject({code : 401, message : err});
    });
};
// ### get the user from the database
UsersService.prototype.getUser = function (credentials) {
  var query = squel.select()
    .from('"user"')
    .where('email = ?', credentials.email)
    .toString();

    return db.query(query)
      .then(function (response) {
        if (response.rows.length === 0) {
          return when.reject({code : 404, message: 'User not found'});
        }
        return response.rows[0];
      });
};
UsersService.prototype.transformResponse = function (user) {
  delete user.password;
  return user;
};
module.exports = new UsersService();
