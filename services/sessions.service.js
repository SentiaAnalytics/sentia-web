'use strict';
var models = require('../models'),
  UsersService = require('./users.service'),
  HTTPError = require('node-http-error'),
  bcrypt = require('./bcrypt.service');


// ## login
// user login function
exports.authenticate = function (credentials) {
  console.log('AUTHENTICATE SERVICE', credentials);
  try {

    return models.User.findOne({email : credentials.email})
      .exec()
      .then(exports._validatePassword.bind(credentials))
      .then(null, function (err) {
        logger.log('debug', ' authenticate', err);
        return Promise.reject(err);
      });
    } catch (e) {
    console.log('ERR', e);
    return Promise.reject(e);
  }
};

exports._validatePassword = function (user) {
  if (!user) {
    return Promise.reject(new HTTPError(401, 'User not found'));
  }
  return user.authenticate(this.password)
    .then(function () {
      return user;
    })
    .catch(function (err) {
      return Promise.reject(new HTTPError(401, 'Invalid Password'));
    });
};
