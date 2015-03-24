'use strict';
var squel = require('squel'),
  db = require('./mysql.service'),
  models = require('../models'),
  HTTPError = require('node-http-error'),
  P = require('bluebird'),
  objectId = require('mongoose').Types.ObjectId,
  moment = require('moment');
squel.useFlavour('mysql');

exports.find = function (query) {
  return P.resolve(query)
    .then(exports._getCamera)
    .then(exports._buildMapQuery)
    .then(db.query)
    .catch(function (err) {
      console.log(err.stack);
      return P.reject(new HTTPError(500, 'Database Error'));
    });
};

exports._getCamera = function (query) {
  return models.Camera.findOne({_id : objectId(query.camera), company : query.company})
    .exec()
    .then(function (camera) {
      if (!camera) {
        return P.reject(new HTTPError(400, 'Camera does not exist'));
      }
      // query.dataId = camera.toObject().dataId;
      return query;
    });
};
exports._buildMapQuery = function (query) {
  return squel.select()
    .field('x')
    .field('y')
    .field('avg(dx)', 'dx')
    .field('avg(dy)', 'dy')
    .field('avg(heat)', 'heat')
    .from('maps_aggregated_daily')
    .where('date <= ?', query.to)
    .where('date >= ?', query.from)
    .where('cam = ?', query.camera)
    .group('x, y')
    .toString();
};
