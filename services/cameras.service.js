'use strict';
var models = require('../models'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  E = require('express-http-errors'),
  logger = require('bragi');

exports.create = function (query) {
  var camera = new models.Camera(query);
  return camera.savep()
    .catch(function (err) {
      return P.reject(new E.InternalError('Database Error'));
    });
};
exports.read = function (query) {
  return P.resolve(query)
    .then(sanitizeQuery)
    .then(function (query) {
      return models.Camera.findOne(query).exec();
    });
    
  
};

exports.find = function (query) {
  return P.resolve(query)
    .then(sanitizeQuery)
    .then(function (query) {
      return models.Camera.find(query).exec();
    });
};

exports.delete = function (query) {
  return models.Camera.findOneAndRemove(query)
    .exec();
};
function sanitizeQuery (query) {
  if(query.store) {
    query.store = objectId(query.store);
  }
    if(query._id) {
    query._id = objectId(query._id);
  }
  return query;
}
