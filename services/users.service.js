'use strict';
var P = require('bluebird'),
  lodash = require('lodash'),
  logger = require('bragi'),
  models = require('../models'),
  bcrypt = require('./bcrypt.service'),
  E = require('express-http-errors');

exports.create = function (query) {
  var user = new models.User(query);
  return user.savep()
    .catch(function (err) {
      logger.log('debug:users', err);
      if (err.err && err.err.indexOf('duplicate key') !== 1) {
        return P.reject(new E.BadRequestError('A user with that email already exists'));
      }
      return P.reject(new E.InternalError('Database Error'));
    });
};

exports.find = function (query) {
  return models.User.find(query).exec();
};

exports.delete = function (query) {
  return models.User.findOneAndRemove(query)
    .exec();
};
