'use strict';
var models = require('../models'),
  P = require('bluebird'),
  HTTPError = require('node-http-error'),
  logger = require('bragi');

exports.create = function (query) {
  var company = new models.Company(query);
  return company.savep()
    .catch(function (err) {
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};
exports.read = function (query) {
  return models.Company.findOne(query).exec();
};

exports.find = function (query) {
  return models.Company.find(query.where).exec();
};

exports.delete = function (query) {
  return models.Camera.findOneAndRemove(query)
    .exec();
};
