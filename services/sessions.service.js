'use strict';
var models = require('../models'),
  UsersService = require('./users.service'),
  HTTPError = require('node-http-error'),
  _ = require('lodash'),
  logger = require('bragi'),
  P = require('bluebird'),
  bcrypt = require('./bcrypt.service');


// ## login
// user login function
exports.authenticate = function (credentials) {
  return models.User.findOne({email : credentials.email})
    .exec()
    .then(exports._validatePassword.bind(credentials))
    .then(null, function (err) {
      logger.log('debug:authenticate', err);
      return P.reject(err);
    });
};

exports._validatePassword = function (user) {
  if (!user) {
    return P.reject(new HTTPError(401, 'User not found'));
  }
  return user.authenticate(this.password)
    .then(function () {
      return user;
    })
    .catch(function (err) {
      return P.reject(new HTTPError(401, 'Invalid Password'));
    });
};
