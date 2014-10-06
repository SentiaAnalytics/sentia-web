'use strict';
var models = require('../models'),
  P = require('bluebird'),
  E = require('express-http-errors'),
  logger = require('bragi');

exports.create = function (query) {
  var store = new models.Store(query);
  return store.savep()
    .catch(function (err) {
      return P.reject(new E.InternalError('Database Error'));
    });
};
exports.read = function (query) {
  return models.Store.findOne(query).exec();
};

exports.find = function (query) {
  return models.Store.find(query).exec();
};

exports.delete = function (query) {
  return models.Camera.findOneAndRemove(query)
    .exec();
};
