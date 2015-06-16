'use strict';
var P = require('bluebird'),
  models = require('../models'),
  bcrypt = require('./bcrypt.service'),
  HTTPError = require('node-http-error');

exports.create = function (query) {
  var user = new models.User(query);
  return user.savep()
    .catch(function (err) {
      logger.log('debug','users', err);
      if (err.err && err.err.indexOf('duplicate key') !== 1) {
        return P.reject(new HTTPError(400, 'A user with that email already exists'));
      }
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};

exports.find = function (query) {
  return models.User.find(query).exec();
};

exports.delete = function (query) {
  return models.User.findOneAndRemove(query)
    .exec();
};
