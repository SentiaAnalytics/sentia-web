'use strict';
var models = require('../models'),
  UsersService = require('./UsersService'),
  E = require('express-http-errors'),
  _ = require('lodash'),
  logger = require('bragi'),
  P = require('bluebird'),
  bcrypt = require('./bcrypt'),
  squel = require('squel');


// ## login
// user login function
exports.authenticate = function (credentials) {
  var query = {
    where : {
      email : credentials.email
    }
  };
  return models.User.find(query)
    .then(_.partial(this._validatePassword, credentials.password));
};


exports._validatePassword = function (password, user) {
  logger.log('debug:session', 'validating password for user :'+user.email);
  return user.validatePassword(password)
    .then(function () {
      return user;
    })
    .catch(function (err) {
      throw new E.BadRequestError('Invalid email or password');
    });
};
