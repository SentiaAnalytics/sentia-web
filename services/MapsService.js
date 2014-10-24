'use strict';
var squel = require('squel'),
  db = require('./mysql'),
  models = require('../models'),
  E = require('express-http-errors'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');
squel.useFlavour('mysql');

exports.find = function (query) {
  return P.resolve(query)
    .then(exports._getCamera)
    .then(exports._buildMapQuery)
    .then(function (query) {
      return query;
    })
    .then(db.query)
    .catch(function (err) {
      console.log(err.stack);
      return P.reject(new E.InternalError('Database Error'));
    });
};
exports._getCamera = function (query) {
  return models.Camera.findOne({_id : objectId(query.camera), company : query.company})
    .exec()
    .then(function (camera) {
      if (!camera) {
        return P.reject(new E.badRequestError('Camera does not exist'));
      }
      query.dataId = camera.toObject().dataId;
      return query;
    });
};
exports._buildMapQuery = function (query) {
  console.log(query);
  return squel.select()
    .field('x')
    .field('y')
    .field('avg(dx)', 'dx')
    .field('avg(dy)', 'dy')
    .field('avg(heat)', 'heat')
    .from('aggregate_maps')
    .where('time < ?', query.to)
    .where('time >= ?', query.from)
    .where('cam = ' + query.dataId)
    .group('x, y')
    .toString();
};
