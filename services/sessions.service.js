'use strict';
var models = require('../models'),
  UsersService = require('./users.service'),
  HTTPError = require('node-http-error'),
  logger = require('bragi'),
  bcrypt = require('./bcrypt.service');


// ## login
// user login function
exports.authenticate = function (credentials) {
  return models.User.findOne({email : credentials.email})
    .exec()
    .then(exports._validatePassword.bind(credentials))
    .then(null, function (err) {
      logger.log('debug:authenticate', err);
      return Promise.reject(err);
    });
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
