'use strict';
var models = require('../models'),
  P = require('bluebird'),
  E = require('express-http-errors'),
  logger = require('bragi');

exports.create = function (body) {
  console.log(body);
  var store = new models.Store(body);
  return store.savep()
    .catch(function (err) {
      return P.reject(new E.InternalError('Database Error'));
    });
};
exports.read = function (query) {
  console.log('READ STORE');
  console.log(query);
  return models.Store.findOne(query).exec();
};

exports.get = function (query) {
  console.log('getStore');
  console.log(query.where);
  return models
    .Store
    .find(query.where)
    .exec()
    .catch(function (err) {
      console.log(err);
      throw err;
    });
};

exports.delete = function (query) {
  return models.Camera.findOneAndRemove(query)
    .exec();
};


exports.update = function (params, body) {
  console.log('update');
  console.log(params);
  console.log(body);
  var query =  models
    .Camera
    .update(params, body, {overwrite : true})
  console.log(query);
    return query.exec();

    // .setOptions({ overwrite: true })
    // .update(body)
    // .exec();
};
